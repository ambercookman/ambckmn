<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package ambckmn
 */

?>

	</div><!-- #content -->

	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="site-info">
			<span class="wp-credit"><a href="<?php echo esc_url( __( 'https://wordpress.org/', 'ambckmn' ) ); ?>"><?php printf( esc_html__( 'Proudly powered by %s', 'ambckmn' ), 'WordPress' ); ?></a></span>
			<span class="sep"> | </span>
			<span class="theme-credit"><?php printf( esc_html__( 'Theme: %1$s by %2$s.', 'ambckmn' ), 'ambckmn', '<a href="http://www.ambercookman.com" rel="designer">Amber Cookman</a></span>' ); ?>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
