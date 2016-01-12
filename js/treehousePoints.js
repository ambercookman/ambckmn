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