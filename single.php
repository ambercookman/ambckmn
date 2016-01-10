<?php
/**
 * The template for displaying all single posts.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package ambckmn
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

		<?php
		while ( have_posts() ) : the_post();

			get_template_part( 'template-parts/content', get_post_format() ); ?>

			<!-- original line used:   the_post_navigation(); -->
			
			<div class="post-navigation">
				<div class="nav-previous alignleft">
					<?php previous_post_link('%link', '&laquo; Previous'); ?>
				</div>
				<div class="nav-next alignright">
					<?php next_post_link('%link', 'Next &raquo;'); ?>
				</div>
			</div> <!-- end navigation -->

			<?php if ( comments_open() || get_comments_number() ) :
				comments_template();
			endif; ?>

		<?php endwhile; // End of the loop.
		?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer();
