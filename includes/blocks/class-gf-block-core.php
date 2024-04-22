<?php

class GF_Block_Core extends GF_Block {

	/**
	 * Contains an instance of this block, if available.
	 *
	 * @since  1.0
	 * @access private
	 * @var    GF_Block $_instance If available, contains an instance of this block.
	 */
	private static $_instance = null;

	/**
	 * Block type.
	 *
	 * @var string
	 */
	public $type = 'gravityforms/block';

	/**
	 * Handle of primary block script.
	 *
	 * @var string
	 */
	public $script_handle = 'gform_editor_block_core';

	/**
	 * Block attributes.
	 *
	 * @var array
	 */
	public $attributes = array(
		'formId'           => array( 'type' => 'integer' ),
		'title'            => array( 'type' => 'boolean' ),
		'description'      => array( 'type' => 'boolean' ),
		'ajax'             => array( 'type' => 'boolean' ),
		'tabindex'         => array( 'type' => 'integer' ),
		'formPreview'      => array( 'type' => 'boolean' ),
		'conditionalLogic' => array( 'type' => 'object' ),
	);

	/**
	 * Get instance of this class.
	 *
	 * @since  1.0
	 * @access public
	 * @static
	 *
	 * @return GF_Block
	 */
	public static function get_instance() {

		if ( null === self::$_instance ) {
			self::$_instance = new self;
		}

		return self::$_instance;

	}

	public function init() {

		parent::init();

		add_action( 'wp_enqueue_scripts', array( $this, 'maybe_enqueue_form_scripts' ) );

	}





	// # SCRIPT / STYLES -----------------------------------------------------------------------------------------------

	/**
	 * Register scripts for block.
	 *
	 * @since  1.0-beta-3
	 * @access public
	 *
	 * @uses   GFAddOn::get_base_path()
	 * @uses   GFAddOn::get_base_url()
	 *
	 * @return array
	 */
	public function scripts() {

		$min = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG || isset( $_GET['gform_debug'] ) ? '' : '.min';

		return array(
			array(
				'handle'   => $this->script_handle,
				'src'      => gf_gutenberg()->get_base_url() . "/js/core{$min}.js",
				'deps'     => array( 'wp-blocks', 'wp-element', 'wp-date', 'wp-components', 'wp-i18n', 'wp-editor' ),
				'version'  => $min ? gf_gutenberg()->get_version() : filemtime( gf_gutenberg()->get_base_path() . '/js/core.js' ),
				'callback' => array( $this, 'localize_script' ),
			),
		);

	}

	/**
	 * Localize core block script.
	 *
	 * @since  1.0-beta-3
	 * @access public
	 *
	 * @param array $script Script arguments.
	 */
	public function localize_script( $script = array() ) {

		wp_localize_script(
			$script['handle'],
			'gform_block_core',
			array(
				'forms'              => $this->get_forms(),
				'conditionalOptions' => gf_gutenberg()->get_conditional_options(),
			)
		);

	}

	/**
	 * Register styles for block.
	 *
	 * @since  1.0-beta-3
	 * @access public
	 *
	 * @uses   GFAddOn::get_base_path()
	 * @uses   GFAddOn::get_base_url()
	 *
	 * @return array
	 */
	public function styles() {

		return array(
			array(
				'handle'  => 'gform_editor_block_core',
				'src'     => gf_gutenberg()->get_base_url() . '/css/core.min.css',
				'deps'    => array( 'wp-edit-blocks' ),
				'version' => filemtime( gf_gutenberg()->get_base_path() . '/css/core.min.css' ),
			),
		);

	}

	/**
	 * Parse current post's blocks for Gravity Forms block and enqueue required form scripts.
	 *
	 * @since  1.0-rc-1.2
	 * @access public
	 */
	public function maybe_enqueue_form_scripts() {
		global $wp_query;

		if( ! isset( $wp_query->posts ) || ! is_array( $wp_query->posts ) ) {
			return;
		}

		foreach ( $wp_query->posts as $post ) {

			if ( ! $post instanceof WP_Post ) {
				continue;
			}

			$blocks = parse_blocks( $post->post_content );

			foreach( $blocks as $block ) {
				if( $block['blockName'] == $this->type && rgars( $block, 'attrs/formId' ) ) {
					require_once( GFCommon::get_base_path() . '/form_display.php' );
					$form = GFAPI::get_form( rgars( $block, 'attrs/formId' ) );
					GFFormDisplay::enqueue_form_scripts( $form, rgars( $block, 'attrs/ajax' ) );
				}
			}

		}

	}





	// # BLOCK RENDER -------------------------------------------------------------------------------------------------

	/**
	 * Display block contents on frontend.
	 *
	 * @since  1.0-beta-3
	 * @access public
	 *
	 * @param array $attributes Block attributes.
	 *
	 * @return string
	 */
	public function render_block( $attributes = array() ) {

		// Prepare variables.
		$form_id     = rgar( $attributes, 'formId' ) ? $attributes['formId'] : false;
		$title       = isset( $attributes['title'] ) ? $attributes['title'] : true;
		$description = isset( $attributes['description'] ) ? $attributes['description'] : true;
		$ajax        = isset( $attributes['ajax'] ) ? $attributes['ajax'] : false;
		$tabindex    = isset( $attributes['tabindex'] ) ? $attributes['tabindex'] : 0;
		$logic       = isset( $attributes['conditionalLogic'] ) ? $attributes['conditionalLogic'] : array();

		// If form ID was not provided or form does not exist, return.
		if ( ! $form_id || ( $form_id && ! GFAPI::get_form( $form_id ) ) || ( ! empty( $logic ) && ! $this->can_view_block( $logic ) && 'edit' !== rgget( 'context' ) ) ) {
			return '';
		}

		if ( defined( 'REST_REQUEST' ) && REST_REQUEST && rgget( 'context' ) === 'edit' ) {
			return gravity_form( $form_id, $title, $description, false, null, $ajax, $tabindex, false );
		}

		return sprintf( '[gravityforms id="%d" title="%s" description="%s" ajax="%s" tabindex="%d"]', $form_id, ( $title ? 'true' : 'false' ), ( $description ? 'true' : 'false' ), ( $ajax ? 'true' : 'false' ), $tabindex );

	}





	// # HELPER METHODS ------------------------------------------------------------------------------------------------

	/**
	 * Get list of forms for Block control.
	 *
	 * @since 2.4.10
	 *
	 * @return array
	 */
	public function get_forms() {

		// Initialize forms array.
		$forms = array();

		// Load GFFormDisplay class.
		if ( ! class_exists( 'GFFormDisplay' ) ) {
			require_once GFCommon::get_base_path() . '/form_display.php';
		}

		// Get form objects.
		$form_objects = GFAPI::get_forms();

		// Loop through forms, add conditional logic check.
		foreach ( $form_objects as $form ) {
			$forms[] = array(
				'id'                  => $form['id'],
				'title'               => $form['title'],
				'hasConditionalLogic' => GFFormDisplay::has_conditional_logic( $form ),
			);
		}

		return $forms;

	}

}

try {

	// Register block.
	GF_Blocks::register( GF_Block_Core::get_instance() );

} catch ( Exception $e ) {

	// Log that block could not be registered.
	GFCommon::log_debug( 'Unable to register block; ' . $e->getMessage() );

}
