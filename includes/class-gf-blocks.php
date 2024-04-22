<?php

require_once( plugin_dir_path( __FILE__ ) . 'blocks/class-gf-block.php' );

class GF_Blocks {

	/**
	 * @var GF_Block[]
	 */
	private static $_blocks = array();

	/**
	 * Register a block type.
	 *
	 * @since  1.0-beta-3
	 * @access public
	 *
	 * @param GF_Block $block Block class.
	 *
	 * @uses   GF_Block::get_type()
	 *
	 * @throws Exception
	 */
	public static function register( $block ) {

		if ( ! is_subclass_of( $block, 'GF_Block' ) ) {
			throw new Exception( 'Must be a subclass of GF_Block' );
		}

		// Get block type.
		$block_type = $block->get_type();

		if ( empty( $block_type ) ) {
			throw new Exception( 'The type must be set' );
		}

		if ( isset( self::$_blocks[ $block_type ] ) ) {
			throw new Exception( 'Block type already registered: ' . $block_type );
		}

		// Register block.
		self::$_blocks[ $block_type ] = $block;

		// Initialize block.
		call_user_func( array( $block, 'init' ) );

	}

	/**
	 * Get instance of block.
	 *
	 * @since  1.0-beta-3
	 * @access public
	 *
	 * @param string $block_type Block type.
	 *
	 * @return GF_Block|bool
	 */
	public static function get( $block_type ) {

		return isset( self::$_blocks[ $block_type ] ) ? self::$_blocks[ $block_type ] : false;

	}

}

new GF_Blocks();

// Load all the block files automatically.
foreach ( glob( plugin_dir_path( __FILE__ ) . 'blocks/class-gf-block-*.php' ) as $filename ) {
	require_once( $filename );
}
