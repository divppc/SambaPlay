$(document).ready(function () {
	//show client info in table
	$('.report:not(.transactional-client-report) .client').on('click', function(e) {
		if ($(e.target).hasClass('user-mail') == false) {
			$(this).toggleClass('active');
		}	
	});

	//show search field
	$('.show-search').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('active');
	});

	var copyMail = function(item) {
		item.addClass('active');

		setTimeout(function() {
			item.removeClass('active');
		}, 3000)
	};

	//copy all emails
	$('.copy-all a').on('click', function(e) {
		e.preventDefault();
		var item = $(this).parent();
		copyMail(item);
	});


	//copy user email
	$('.user-mail').on('click', function(e) {
		e.preventDefault();
		var item = $(this);
		copyMail(item);
	});

	//live search
	$('.report-search input').on('input', function() {
		var len = $(this).val().length;
		if (len !== 0) {
			$('.stat-panel').addClass('hidden');
			$('.filters').addClass('hidden');
			$('thead').addClass('hidden');
		} else {
			$('.stat-panel').removeClass('hidden');
			$('.filters').removeClass('hidden');
			$('thead').removeClass('hidden');
		}
	});


	//users view settings
	var currentView = $('.current-view'),
			viewList = $('.view-list'),
			viewHolder = $('.current-view span');

	currentView.on('click', function(e) {
		$('.view-list, .current-view').toggleClass('active');
	});

	viewList.find('a').on('click', function(e) {
		e.preventDefault();
		var list = viewList.find('a');

		for (var i = 0; i < list.length; i++) {
			$(list[i]).removeClass('active');
		};

		$(this).addClass('active');
		viewHolder.html($(this).html());
		viewList.removeClass('active');
		currentView.removeClass('active');

		if($(list[list.length-1]).hasClass('active')) {
			$('.custom-date').addClass('active');
		} else {
			$('.custom-date').removeClass('active');
		}
	});

	$('.datepicker').pickadate({
    selectMonths: false, // Creates a dropdown to control month
    selectYears: 5, // Creates a dropdown of 15 years to control year,
    today: false,
    clear: false,
    close: 'Ok',
    closeOnSelect: false, // Close upon selecting a date,
    monthsFull: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
    monthsShort: [ 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez' ],
    weekdaysFull: [ 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado' ],
    weekdaysShort: [ 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab' ],
    today: 'Hoje',
    clear: 'Limpar',
    close: 'Fechar',
    format: 'd !de mmmm !de yyyy',
    formatSubmit: 'yyyy/mm/dd'
  });
});


//profit chart

	


var draw = Chart.controllers.line.prototype.draw;
Chart.controllers.line = Chart.controllers.line.extend({
    draw: function() {
        draw.apply(this, arguments);
        var ctx = this.chart.chart.ctx;
        var _stroke = ctx.stroke;
        ctx.stroke = function() {
            ctx.save();
            ctx.shadowColor = 'rgb(133, 219, 94)';
            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            _stroke.apply(this, arguments)
            ctx.restore();
        }
    }
})


var ctx = document.getElementById("profit-chart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["", "", "", "", "", "", "", "", "", "",],
        datasets: [{
            data: [2, 4, 6, 6, 9, 12, 14, 14, 16, 19],
            borderColor: 'rgb(133, 219, 94)',
            borderWidth: 2,
            fill: false,
            pointRadius: 0
        }]
    },

    options: {
      scales: {
          yAxes: [{
          		display: false,
          }],
          xAxes: [{
              gridLines: {
                  display:false
              }  
          }]
      },
      fill: false,
      legend: false,
      layout: {
      	padding: {
              left: 0,
              right: 0,
              top: 15,
              bottom: 0
          }
      }
    }
});