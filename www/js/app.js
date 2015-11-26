// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

  .run(function ($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }

      $rootScope.$on('$cordovaLocalNotification:trigger', function (event, notification, state) {
        console.log("TRIGGER");
        console.log('event', event);
        console.log('notification', notification);
        console.log('state', state);
      });

      $rootScope.$on('$cordovaLocalNotification:update', function (event, notification, state) {
        console.log('UPDATE');
        console.log('event', event);
        console.log('notification', notification);
        console.log('state', state);
      });
      
        $rootScope.$on('$cordovaLocalNotification:cancel', function (event, notification, state) {
        console.log('CANCEL');
        console.log('event', event);
        console.log('notification', notification);
        console.log('state', state);
      });
    });
  })
  .controller('SampleController', function ($scope, $cordovaLocalNotification, $ionicPlatform) {
    $ionicPlatform.ready(function () {

      $scope.scheduleInstantNotification = function () {
        console.log("Schedule Instant Notification");
        $cordovaLocalNotification.schedule({
          id: "instant",
          text: 'Instant Notification Has Been Triggered',
          title: 'Instant'
        });
      };

      $scope.scheduleDelayedNotification = function () {
        console.log("Schedule In 5 Seconds Notification");
         var now = new Date().getTime();
          var _5SecondsFromNow = new Date(now + 5 * 1000);

        $cordovaLocalNotification.schedule({
          id: "fiveSeconds",
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
          id: "EveryMinute",
          title: 'Every Minute',
          text: 'Give a real message',
          every: 'minute'
        }).then(function (result) {
          console.log('Every Minute Notification Set');
        });
      };      
        
        
      // Update a Scheduled Notification
      $scope.updateNotificationText = function () {
        $cordovaLocalNotification.update({
          id: "Every Minute",
          title: 'Notificaton  Update',
          text: 'Notification Update Details'
        }).then(function (result) {
          console.log('Updated Notification');
        }).then(function (result) {
          console.log('Notification Updated');
        });
      };  
      
       $scope.updateNotificationEvery = function () {
        $cordovaLocalNotification.update({
          id: "Every Minute",
          title: 'Notificaton  Update',
          text: 'Every Minute change to second',
          every: 'second'
          
        }).then(function (result) {
          console.log('Updated Notification');
        }).then(function (result) {
          console.log('Notification Updated');
        });
      };  
        
      //Cancel a Notification
      $scope.cancelNotification = function () {
        $cordovaLocalNotification.cancel("EveryMinute").then(function (result) {
          console.log('Notification EveryMinute Cancelled');
        });
      };
    });
  });