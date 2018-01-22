var totop = function(){
  $('#totop').on('click', function(){
     $('body,html').animate({scrollTop:0},600);
  });
  $('#tobottom').on('click', function(){
     $('body,html').animate({scrollTop: $('#footer').offset().top},600);
  });
}

var indicator = function(){



    var getMax = function(){
        return $(document).height() - $(window).height();
    }

    var getValue = function(){
        return $(window).scrollTop();
    }

    if('max' in document.createElement('progress')){
        // Browser supports progress element
        var progressBar = $('progress');

        // Set the Max attr for the first time
        progressBar.attr({ max: getMax() });

        $(document).on('scroll', function(){
            // On scroll only Value attr needs to be calculated
            progressBar.attr({ value: getValue() });
        });

        $(window).resize(function(){
            // On resize, both Max/Value attr needs to be calculated
            progressBar.attr({ max: getMax(), value: getValue() });
        });
    }
    else {
        var progressBar = $('.progress-bar'),
            max = getMax(),
            value, width;

        var getWidth = function(){
            // Calculate width in percentage
            value = getValue();
            width = (value/max) * 100;
            width = width + '%';
            return width;
        }

        var setWidth = function(){
            progressBar.css({ width: getWidth() });
        }

        $(document).on('scroll', setWidth);
        $(window).on('resize', function(){
            // Need to reset the Max attr
            max = getMax();
            setWidth();
        });
    }

}

var contings = function () {
  var timestamp = Math.floor(Date.now() / 1000);
  var myAge = parseInt(1342656000);
  var rand = parseInt(timestamp - myAge);
    var myYears = Math.floor(rand/(24*3600*365));
    var leave0 = rand%(24*3600*365);
    var myDays = Math.floor(leave0/(24*3600));
    var leave1 = leave0%(24*3600);
    var myHours = Math.floor(leave1/(3600));
      $("#conting").html(myYears + ' Years ' + myDays + ' days ' + 'and' + myHours + ' hours ' );
      rand++;
}


var pageLoad = function(){
  var sitepath = window.location.pathname;
  var re = new RegExp(/\d+/);
  if(sitepath.length <= 1){
    var page = 2;
  }else{
    var n = re.exec(sitepath);
    var page = parseInt(n) + 1;
  }
  $('#postload').click(function(){
    var btn = $(this);
    btn.addClass('hide');
    var siteUrl = "/page" + page +".html";
    $.ajax({
      url: siteUrl,
      type:'get',
      success:function(data) {
        page++;
        if(data){
          var data = $(data).find('.workContainer .singleItem');
          $('.workContainer').append(data);
          btn.removeClass();
        }else{
            btn.addClass('hide').siblings().removeClass('hide');
            return false;
        }
     },
     error : function() {
        btn.addClass('hide').siblings().removeClass('hide');
        return false;
     }
    });
  })
}

$(document).ready(function() {
  pageLoad();
  contings();
	totop();
  indicator();
});
