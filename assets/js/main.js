window.onload = function () {


	///get select data
	function getSelectData() {
		var customSelect = document.querySelector('.dropdown-content'),
			selectStatus = 1;

		if (customSelect !== null) {
				var checkedListItems = customSelect.querySelectorAll('li');
				for (var i = 0, len = checkedListItems.length; i < len; i++) {
					if(checkedListItems[i].classList.contains('active')) {
						selectStatus = 1;
						return selectStatus;
					} else {
						selectStatus *= 0;
					}
				}
		}
		return selectStatus;
	};
	
	///
	
	// submit button disabled until all fields non empty
	var disabledSend = function(form, inputs) {
		var trigger,
				sendBtn = modalForm.querySelector('button[type="submit"]');

		for (var i = 0, len = inputs.length; i < len; i++) {
				inputs[i].addEventListener("blur", function() {

					trigger = 1;

					for (var j = 0, len2 = inputs.length; j < len2; j++) {

						if(inputs[j].classList.contains("valid")) {
							trigger *= 1;
						} else {
							trigger *= 0;
						}
					};

					// get checkbox data
					var requiredCheckbox = document.getElementById("user-agreement"),
							checkBoxStatus;

					if (requiredCheckbox !== null) {
						checkBoxStatus = requiredCheckbox.checked;
					} else {
						checkBoxStatus = 1;
					}

					var selectStatus2 = getSelectData();

					if(trigger && checkBoxStatus && selectStatus2) {
						sendBtn.classList.remove("disabled");
					} else {
						sendBtn.classList.add("disabled")
					};
			});
		};
	};

	var modalForm = document.querySelector(".modal form");			

	if (modalForm) {
		var inputs = modalForm.querySelectorAll('input.validate');
		disabledSend(modalForm, inputs);
	}

	//two steps form

	var twoStepForm = function(fields, requiredCheckbox) {

		requiredCheckbox.addEventListener('click', function() {
			var trigger2 = 1;
			for (var j = 0, len2 = fields.length; j < len2; j++) {
				if(fields[j].classList.contains("valid") && requiredCheckbox.checked) {
					trigger2 *= 1;
				} else {
					trigger2 *= 0;
				}
			};
			var selectStatus3 = getSelectData();
			var showNextStep = document.querySelector(".modal-content");
			if (trigger2 && selectStatus3) {				
				showNextStep.classList.add("filled");
			} else {
				showNextStep.classList.remove("filled");
			}
		})
	};

	var fields = document.querySelectorAll(".main-part input.validate"),
			requiredCheckbox = document.getElementById("user-agreement");

	if (requiredCheckbox !== null) {
		twoStepForm(fields, requiredCheckbox);
	}

	// toggle between form parts
	var nextStep = document.querySelector(".next-step"),
			prevStep = document.querySelector(".prev-step");
			formHead = document.getElementsByTagName('h1')[0],
			parentWindow = document.querySelector(".modal");

	if (nextStep) {
		nextStep.addEventListener("click", function() {
			parentWindow.classList.remove("step1");
			parentWindow.classList.add("step2");
			if (parentWindow.classList.contains('social-register') == false) {
				formHead.innerHTML = 'Endereço';
			}			
		});
	}

	if (prevStep) {
		prevStep.addEventListener("click", function() {			
			parentWindow.classList.remove("step2");
			parentWindow.classList.add("step1");
			if (parentWindow.classList.contains('social-register') == false) {
				formHead.innerHTML = 'Cadastro';
			}
		});
	};
	

	//show adress panel 
	var toggler = document.getElementById("toggler");

	if (toggler) {

		toggler.addEventListener("click", function() {
			var panelContent = document.querySelector(".panel-content"),
					togglerStatus = this.previousElementSibling;

			if (toggler.checked) {
				togglerStatus.innerHTML = 'ATIVADO';
				panelContent.classList.add('active');
			} else {
				togglerStatus.innerHTML = 'DESATIVADO';
				panelContent.classList.remove('active');
			}
		})
	};

	// create new fields
	var addFieldBtn = document.querySelector('.new-field');

	if (addFieldBtn) {
		addFieldBtn.addEventListener("click", function(e) {
			e.preventDefault();
			createNewField();
		});
	}

	var createNewField = function() {
		var newField = document.createElement('div'),
				insertTo = document.querySelector('.panel-form .fields');
		newField.classList.add('field');
		newField.innerHTML = '<div class="input-field"><a href="#" class="prefix tooltipped" data-position="top" data-tooltip="Clique para tornar opcional">*</a><input type="text" placeholder="Você é um fótografo profissional?"></div><div class="field-options"><div class="field-type"><div class="current-field-type">Resposta Curta</div><ul><li class="active">Resposta Curta</li><li>Menu de opções</li></ul></div><a href="#" class="prefix remove-field tooltipped" data-position="top" data-tooltip="Excluir campo"><i class="material-icons">delete</i></a></div>';
		insertTo.appendChild(newField);

		// reinit buttons in new fields
			var toggleBtns = $(".field:not(.default) .field-type");

			showtypeOfField(toggleBtns[toggleBtns.length-1]);
			deleteFieldFunction();

			$('.tooltipped').tooltip({
		  	delay: 50
		  });
	}


	//remove created field
	var deleteFieldFunction = function() {
		var deleteFieldBtns = document.querySelectorAll('.remove-field');

		if(deleteFieldBtns.length !== 0) {
			for (var i = 0, len = deleteFieldBtns.length; i < len; i++) {
				deleteFieldBtns[i].addEventListener('click', function(e) {
					e.preventDefault();
					var target = this.closest('.field');
					$(target).find('.tooltipped').tooltip('remove');
					target.parentNode.removeChild(target);
				});
			};
		};
		
	};

	deleteFieldFunction();
};

// show type od created field
var showtypeOfField = function(toggleBtns) {
	
	$(toggleBtns).on("click", function(e) {
		var target = this,
				optionList = $(target).find("ul")[0],
				displayChecked = $(this).find('.current-field-type'),
				listItems = $(optionList).find("li"),
				activeLiItem;

		$(optionList).toggleClass("active");
		$(target).addClass('created');

		$(listItems).on("click", function(e) {
			var clickedLi = $(e.target);

			for (var i = 0, len = $(listItems).length; i < len; i++) {
				$(listItems[i]).removeClass("active");
			};

			$(clickedLi).addClass("active");
			$(displayChecked).html($(clickedLi).html());

			activeLiItem = $(clickedLi);
			activeLiItemIndex = $(clickedLi).index();
			createMultipleField(activeLiItem, activeLiItemIndex);
		})
	});
};


// create multiple field
var createMultipleField = function(activeLiItem, activeLiItemIndex) {
	var multipleField = '<ol class="select-options"><li><div class="input-field"><input type="text" placeholder="Option"></div><div class="field-options"></div></li></ol>';
			parentField = $(activeLiItem).closest('.field')[0];
			$(parentField).addClass('multiple'),
			status = $(parentField).find('ol').length;

	if(activeLiItemIndex == 1 && status == 0) {		
		$(parentField).append(multipleField);		
	} else {		
		$(parentField).find('ol').remove();
	};

	var optionsInputs = $('.select-options li:last-child input');

	var latestCreatedList = $('.select-options')[$('.select-options').length-1],
			latestCreatedListItems = $(latestCreatedList).find('li:last-child input');

	inputOption(latestCreatedListItems);
};


// create new option for multiple field
var inputOption = function(optionsInputs) {

		var	newListRow = '<li><div class="input-field"><input type="text" placeholder="Option"></div><div class="field-options"><a href="#" class="prefix remove-line tooltipped" data-position="top" data-tooltip="Excluir opção"><i class="material-icons">close</i></a></div></li>';

	$(optionsInputs).on("keypress", function(e) {
		var inputedValue = $(this).val(),
				inputedChar = e.which,
				insertTo = $(optionsInputs).closest('ol');

				if(inputedChar == 13) {
					$(insertTo).append(newListRow);
					var lastLi = $(insertTo).find('li').length-1;
					var createdLi = $(insertTo).find('li')[lastLi];
					$(createdLi).find('input').focus();
					inputOption(createdLi);
				}
	});

	// remove option line
	$('.remove-line').on("click", function(e) {
		e.preventDefault();
		var targetLi = $(this).closest('li');
		$(targetLi).find('.tooltipped').tooltip('remove');
		$(targetLi).remove();
	});

	//updated tooltips
	$('.tooltipped').tooltip({
  	delay: 50
  });
};



//polyfill for closest
(function() {

  // проверяем поддержку
  if (!Element.prototype.closest) {

    // реализуем
    Element.prototype.closest = function(css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }

})();

if (Element && !Element.prototype.matches) {
    var proto = Element.prototype;
    proto.matches = proto.matchesSelector ||
        proto.mozMatchesSelector || proto.msMatchesSelector ||
        proto.oMatchesSelector || proto.webkitMatchesSelector;
}

//materialize components
$(document).ready(function() {
  $('select').material_select();
  $('.tooltipped').tooltip({
  	delay: 50
  });  
});