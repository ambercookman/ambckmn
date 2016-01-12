/**
 * navigation.js
 *
 * Handles toggling the navigation menu for small screens and enables tab
 * support for dropdown menus.
 */
( function() {
	var container, button, menu, links, subMenus;

	container = document.getElementById( 'site-navigation' );
	if ( ! container ) {
		return;
	}

	button = container.getElementsByTagName( 'button' )[0];
	if ( 'undefined' === typeof button ) {
		return;
	}

	menu = container.getElementsByTagName( 'ul' )[0];

	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof menu ) {
		button.style.display = 'none';
		return;
	}

	menu.setAttribute( 'aria-expanded', 'false' );
	if ( -1 === menu.className.indexOf( 'nav-menu' ) ) {
		menu.className += ' nav-menu';
	}

	button.onclick = function() {
		if ( -1 !== container.className.indexOf( 'toggled' ) ) {
			container.className = container.className.replace( ' toggled', '' );
			button.setAttribute( 'aria-expanded', 'false' );
			menu.setAttribute( 'aria-expanded', 'false' );
		} else {
			container.className += ' toggled';
			button.setAttribute( 'aria-expanded', 'true' );
			menu.setAttribute( 'aria-expanded', 'true' );
		}
	};

	// Get all the link elements within the menu.
	links    = menu.getElementsByTagName( 'a' );
	subMenus = menu.getElementsByTagName( 'ul' );

	// Set menu items with submenus to aria-haspopup="true".
	for ( var i = 0, len = subMenus.length; i < len; i++ ) {
		subMenus[i].parentNode.setAttribute( 'aria-haspopup', 'true' );
	}

	// Each time a menu link is focused or blurred, toggle focus.
	for ( i = 0, len = links.length; i < len; i++ ) {
		links[i].addEventListener( 'focus', toggleFocus, true );
		links[i].addEventListener( 'blur', toggleFocus, true );
	}

	/**
	 * Sets or removes .focus class on an element.
	 */
	function toggleFocus() {
		var self = this;

		// Move up through the ancestors of the current link until we hit .nav-menu.
		while ( -1 === self.className.indexOf( 'nav-menu' ) ) {

			// On li elements toggle the class .focus.
			if ( 'li' === self.tagName.toLowerCase() ) {
				if ( -1 !== self.className.indexOf( 'focus' ) ) {
					self.className = self.className.replace( ' focus', '' );
				} else {
					self.className += ' focus';
				}
			}

			self = self.parentElement;
		}
	}
} )();

/**
 * skip-link-focus-fix.js
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */
( function() {
	var is_webkit = navigator.userAgent.toLowerCase().indexOf( 'webkit' ) > -1,
	    is_opera  = navigator.userAgent.toLowerCase().indexOf( 'opera' )  > -1,
	    is_ie     = navigator.userAgent.toLowerCase().indexOf( 'msie' )   > -1;

	if ( ( is_webkit || is_opera || is_ie ) && document.getElementById && window.addEventListener ) {
		window.addEventListener( 'hashchange', function() {
			var id = location.hash.substring( 1 ),
				element;

			if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
				return;
			}

			element = document.getElementById( id );

			if ( element ) {
				if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
					element.tabIndex = -1;
				}

				element.focus();
			}
		}, false );
	}
})();

// Problem: 5 cards, need to be sorted in order from lowest to highest value.

/* 
Solution: Program that checks cards in pairs, and moves the higher value card in the pair to the right.
 		  Continually passes until it completes an entire pass with all cards sorted (none move).
*/


// Function to return a random integer. Max value is exclusive, i.e. to return values 1-10, use min 1, max 11

var getRandomInt = function(min, max) {
	return Math.floor( Math.random() * (max-min) ) + min;
}


// Create a variable that contains an array of 5 random values to be compared.

var cardSort = new Array();
var arrayLength = 5;
var i = 0;

for (; i < arrayLength; i++) {
	cardSort[i] = getRandomInt(1,11);
}

// Log the creation of the array of 5 integers in the console.

var logText = "";
i = 0;

for (; i < arrayLength; i++) {
	logText += cardSort[i] + ", ";
}

console.log("Starting Values: \t" + logText);


// Sort the array using a functions that compares values in pairs, shifting the higher value to the right.

i = 0;
var didSwap = true;
var temp;
for(; i < arrayLength && didSwap; i++) {
	didSwap = false;
	var j = 0;
	for(; j < (arrayLength - 1); j++) {
		if(cardSort[j] > cardSort[j+1]) {
			temp = cardSort[j];
			cardSort[j] = cardSort[j+1];
			cardSort[j+1] = temp;
			didSwap = true;
		}
	}

	logText = "New Order: \t\t";
	k = 0;
	for(; k < arrayLength; k++) {
		logText += cardSort[k] + ", ";
	}
	console.log(logText);
}



























jQuery.ajax('https://'+jQuery('.team-treehouse > a').attr('href')+'.json')
  .done(function(data) {
 // pull was a success
  var items = [];
  jQuery.each( data, function( key, val ) {
    if (key.toLowerCase() === 'points') {
      jQuery.each(val, function( key2, val2 ) {
        if (val2 !== 0) {
          if (key2.toLowerCase() !== 'total') {
            items.push([key2,val2]);
          } else {
            jQuery('strong.total').text(val2);
          } 
        }
      });
    }
  });

  // sort
  var sorted = [];
  if (items.length === 0) {
    sorted = items;
  } else {
    sorted = [items.shift()];
  }

  while (items.length > 0) {
    for (i = 0; i < sorted.length; i++) {
      if (items[0][1] > sorted[i][1]) {
        sorted.splice(i,0,items.shift());
        break;
      }
      if (i === sorted.length-1) {
        sorted.push(items.shift());
        break;
      }   
    }
  }
  // make into html
  html = [];
  html.push("<ul>");
  for (s in sorted) {
    html.push("<li>");
    html.push("<em>" + sorted[s][0] + "</em>");
    html.push("<span>" + sorted[s][1]  + "</span>");
    html.push("</li>");
  }
  html.push("</ul>");  
  
  // make legend
  jQuery('.legend').append(html.join(""));
  
  // make legend pretty w/colors
  prettyLegend(".legend");
  })
  .fail(function() {
    jQuery('.team-treehouse > a > h2').text("Could not connect. Username my be incorrect.");
  })

function prettyLegend(dataElement) {
  var listNames = [];
  var listData = [];
  jQuery(dataElement+" li").each(function() {
    listNames.push(jQuery(this).children('em').html());
    listData.push(Number(jQuery(this).children('span').html()));
  });
  
  var listTotal = 0;
  for(var i=0; i<listData.length; i++) {
    listTotal += listData[i];
  }

  var colors = {};
  colors['Android'] = '#5cb860';
  colors['Business'] = '#f9845b';
  colors['CSS'] = '#3079ab';
  colors['Design'] = '#e59a13';
  colors['Development Tools'] = '#637a91';
  colors['HTML'] = '#39add1';
  colors['iOS'] = '#53bbb4';
  colors['Java'] = '#2c9676';
  colors['Javascript'] = '#c25975';
  colors['PHP'] = '#7d669e';
  colors['Python'] = '#f092b0';
  colors['Ruby'] = '#e15258';
  colors['WordPress'] = '#838cc7';
  colors['Digital Literacy'] = '#c38cd4';
  
  for(var i=0; i<listData.length; i++) {
    var color = '#000000';
    for (var c in colors) {
      if (listNames[i].toLowerCase() === c.toLowerCase()) {
        color = colors[c];
      }
    }
    
    // set legend colors
    jQuery(dataElement+" li:nth-child("+(i+1)+")").css("border-color", color);
  }
} 
//# sourceMappingURL=main.js.map
