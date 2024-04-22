<?php
/**
 * Plugin Name: Gravity Forms Gutenberg Add-On (Experimental)
 * Plugin URI: https://www.gravityforms.com
 * Description: Adds a Gravity Forms block to the Gutenberg post editor.
 * Version: 1.0-rc-1.4
 * Author: rocketgenius
 * Author URI: https://www.rocketgenius.com
 * License: GPL-2.0+
 * Text Domain: gravityformsgutenberg
 * Domain Path: /languages
 *
 * ------------------------------------------------------------------------
 * Copyright 2012-2016 Rocketgenius Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
 **/

define( 'GF_GUTENBERG_VERSION', '1.0-rc-1.4' );

// If Gravity Forms is loaded, bootstrap the Gutenberg Add-On.
add_action( 'gform_loaded', array( 'GF_Gutenberg_Bootstrap', 'load' ), 5 );

add_action( 'init', array( 'GF_Gutenberg_Bootstrap', 'load_blocks' ), 5 );

/**
 * Class GF_Gutenberg_Bootstrap
 *
 * Handles the loading of the Gutenberg Add-On and registers it with the Add-On Framework.
 */
class GF_Gutenberg_Bootstrap {

	/**
	 * Load GF_Blocks class.
	 *
	 * @access public
	 * @static
	 */
	public static function load_blocks() {

		if ( ! method_exists( 'GFForms', 'include_addon_framework' ) || ! function_exists( 'register_block_type' ) ) {
			return;
		}

		require_once 'includes/class-gf-blocks.php';

	}

	/**
	 * If the Add-On Framework and Gutenberg exist, Gutenberg Add-On is loaded.
	 *
	 * @access public
	 * @static
	 */
	public static function load() {

		if ( ! method_exists( 'GFForms', 'include_addon_framework' ) || ! function_exists( 'register_block_type' ) ) {
			return;
		}

		require_once( 'class-gf-gutenberg.php' );

		GFAddOn::register( 'GF_Gutenberg' );

	}

}

/**
 * Returns an instance of the GF_Gutenberg class
 *
 * @see    GF_Gutenberg::get_instance()
 * @return GF_Gutenberg
 */
function gf_gutenberg() {
	return GF_Gutenberg::get_instance();
}
