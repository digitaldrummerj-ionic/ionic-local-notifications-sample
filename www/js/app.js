angular.module('starter', ['ionic', 'ngCordova'])
  .run(function ($ionicPlatform, $rootScope) {
	$ionicPlatform.ready(function () {
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}

		$rootScope.$on('$cordovaLocalNotification:schedule',
			function (event, notification, state) {
				console.log("SCHEDULE");
				console.log('event', event);
				console.log('notification', notification);
				console.log('state', state);
			});

		$rootScope.$on('$cordovaLocalNotification:trigger',
			function (event, notification, state) {
				console.log("TRIGGER");
				console.log('event', event);
				console.log('notification', notification);
				console.log('state', state);
			});

		$rootScope.$on('$cordovaLocalNotification:update',
			function (event, notification, state) {
				console.log('UPDATE');
				console.log('event', event);
				console.log('notification', notification);
				console.log('state', state);
			});

		$rootScope.$on('$cordovaLocalNotification:cancel',
			function (event, notification, state) {
				console.log('CANCEL');
				console.log('event', event);
				console.log('notification', notification);
				console.log('state', state);
			});
	});
  })
  .controller('SampleController',
	function ($scope, $cordovaLocalNotification, $ionicPlatform) {
		$ionicPlatform.ready(function () {

			$scope.scheduleInstantNotification = function () {
				$cordovaLocalNotification.schedule({
					id: 1,
					text: 'Instant Notification',
					title: 'Instant'
				}).then(function () {
					alert("Instant Notification set");
				});;
			};

			$scope.scheduleDelayedNotification = function () {
				var now = new Date().getTime();
				var _5SecondsFromNow = new Date(now + 5000);

				$cordovaLocalNotification.schedule({
					id: 2,
					at: _5SecondsFromNow,
					text: 'Notification After 5 Seconds Has Been Triggered',
					title: 'After 5 Seconds'
				}).then(function (result) {
					console.log('After 5 sec Notification Set');
				});
			}

			//Scheduled Every X Seconds / Minutes
			//Every Options: second, minute, hour, day, week, month, year
			$scope.scheduleEveryMinuteNotification = function () {
				$cordovaLocalNotification.schedule({
					id: 3,
					title: 'Every Minute',
					text: 'Give a real message',
					every: 'minute'
				}).then(function (result) {
					console.log('Every Minute Notification Set');
				});
			};


			// Update a Scheduled Notification
			$scope.updateNotificationText = function () {
				$cordovaLocalNotification.isPresent(3).then(function (present) {
					if (present) {
						$cordovaLocalNotification.update({
							id: 3,
							title: 'Notificaton  Update',
							text: 'Notification Update Details'
						}).then(function (result) {
							console.log('Updated Notification Text');
						});
					} else {
						alert("Must Schedule Every Minute First");
					}
				});
			};

			$scope.updateNotificationEvery = function () {
				$cordovaLocalNotification.isPresent(3).then(function (present) {
					if (present) {
						$cordovaLocalNotification.update({
							id: 3,
							title: 'Notification  Update',
							text: 'Every Minute change to second',
							every: 'second'

						}).then(function (result) {
							console.log('Updated Notification Every');
						});
					} else {
						alert("Must Schedule Every Minute First");
					}
				});
			};

			//Cancel a Notification
			$scope.cancelNotification = function () {
				$cordovaLocalNotification.isPresent(3).then(function (present) {
					if (present) {
						$cordovaLocalNotification.cancel(3).then(function (result) {
							console.log('Notification EveryMinute Cancelled');
							alert('Cancelled Every Minute');
						});
					} else {
						alert("Must Schedule Every Minute First");
					}
				});


			};
		});
	});