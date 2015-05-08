function myGetElementsByClassName(selector) {
  
    if ( document.getElementsByClassName ) {
        return document.getElementsByClassName(selector);
    }

    var returnList = new Array();
    var nodes = document.getElementsByTagName('div');
    var max = nodes.length;
    for ( var i = 0; i < max; i++ ) {
        if ( nodes[i].className == selector ) {
            returnList[returnList.length] = nodes[i];
        }
    }
    return returnList;
}

var rssReader = {
  
    containers : null,

   
    // initialization function
    init : function(selector) {
         
        containers = myGetElementsByClassName(selector);
      
       // this is the input variable
      
        for(i=0;i<containers.length;i++){
          
          //import text input for custom feed
          var input = document.getElementById('dt_id'),
        rssName = input.value;
         
          //Adjusting link in third column for custom input 
            if (containers[i].getAttribute('id') == "post_results3") {
              var rssUrl = "http://www.bing.com/news/search?q="+rssName+"&FORM=HDRSC6&format=rss";
              
            }
          
          else {
             var rssUrl = containers[i].getAttribute('rss_url');
          }
          
            // getting necessary variables
            var num = containers[i].getAttribute('rss_num');
            var id = containers[i].getAttribute('id');

            // creating temp scripts to help transform XML (RSS) to JSON
            var url = encodeURIComponent(rssUrl);
            var googUrl = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num='+num+'&q='+url+'&callback=rssReader.parse&context='+id;

            var script = document.createElement('script');
            script.setAttribute('type','text/javascript');
            script.setAttribute('charset','utf-8');
            script.setAttribute('src',googUrl);
            containers[i].appendChild(script);
      
        }
    },

    // parsing of results
    parse : function(context, data) {
        var container = document.getElementById(context);
        container.innerHTML = '';

        // creating list of elements
        var mainList = document.createElement('ul');

        // also creating its childs (subitems)
        var entries = data.feed.entries;
        for (var i=0; i<entries.length; i++) {
            var listItem = document.createElement('li');
            var title = entries[i].title;
            var contentSnippet = entries[i].contentSnippet;
            var contentSnippetText = document.createTextNode(contentSnippet);

            var link = document.createElement('a');
            link.setAttribute('href', entries[i].link);
            link.setAttribute('target','_blank');
            var text = document.createTextNode(title);
            link.appendChild(text);

            // add link to list item
            listItem.appendChild(link);

            var desc = document.createElement('p');
            desc.appendChild(contentSnippetText);

            // add description to list item
            listItem.appendChild(desc);

            // adding list item to main list
            mainList.appendChild(listItem);
        }
        container.appendChild(mainList);
    }



};

window.onload = function() {
    rssReader.init('post_results');
}

document.onclick = function() {
    rssReader.init('post_results');
}