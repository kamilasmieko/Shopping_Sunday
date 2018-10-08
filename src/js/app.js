var app = angular.module('shoppingSunday', []);

app.controller('myCtrl', ['$scope', '$filter', '$window', '$http', function($scope, $filter, $window, $http, myServiceFunction) {

  // TODAY's date
  // $scope.today = new Date(2018, 4, 15); //TESTING --- NOTICE! month -1, e.g. October = 9, November = 10, December 11, etc.
  $scope.today = new Date();

  // DETERMINE CURRENT YEAR'S WEEK NUMBER (UTC added in order to count week's number starting MON)
  $scope.currentWeek =  +$filter('date')(new Date( $scope.today.getFullYear(), $scope.today.getMonth(), $scope.today.getDate()), 'ww', 'UTC');

  $scope.sundayDate, $scope.quote;
  $scope.closed = false;

  // BACKGROUND style
  $scope.background = {
    //if no image loaded, background is yellow
    "background" : "yellow"
  }
  $scope.background_mobile= {
    //if no image loaded, background is red
    "background" : "red"
  }
  // STYLES:
  $scope.CircleBlackOrWhite, $scope.blackOrWhite;


  // LIST of SUNDAYS - when stores are closed; NOTICE! month -1, e.g. October = 9, November = 10, December 11, etc.
  $scope.sundays = [
    {freeSun: false, date: new Date(2018, 9, 7), week: 40, background: "url('./src/img/180720_niedziela_handlowa_zdj1.jpg')", background_mobile: "url('./src/img/frankie-cordoba-526925-unsplash.jpg')", quote: "Biegnij do sklepu, świat za oknem poczeka..."},
    {freeSun: true, date: new Date(2018, 9, 14), week: 41, background: "url('./src/img/180720_niedziela_handlowa_zdj3.jpg')", background_mobile: "url('./src/img/evan-kirby-226482-unsplash.jpg')", quote: "Świat jest piękny, wyjdź na spacer z przyjacielem!"},
    {freeSun: true, date: new Date(2018, 9, 21), week: 42, background: "url('./src/img/180720_niedziela_handlowa_zdj4.jpg')", background_mobile: "url('./src/img/sebastian-garcia-247546-unsplash.jpg')", quote: "Świat jest piękny, wyjdź na spacer z przyjacielem!"},
    {freeSun: false, date: new Date(2018, 9, 28), week: 43, background: "url('./src/img/180720_niedziela_handlowa_zdj2.jpg')", background_mobile: "url('./src/img/anna-utochkina-672220-unsplash.jpg')", quote: "Biegnij do sklepu, świat za oknem poczeka..."},
    {freeSun: false, date: new Date(2018, 10, 4), week: 44, background: "url('./src/img/180720_niedziela_handlowa_zdj1.jpg')", background_mobile: "url('./src/img/frankie-cordoba-526925-unsplash.jpg')", quote: "Biegnij do sklepu, świat za oknem poczeka..."},
    {freeSun: true, date: new Date(2018, 10, 11), week: 45, background: "url('./src/img/180720_niedziela_handlowa_zdj3.jpg')", background_mobile: "url('./src/img/evan-kirby-226482-unsplash.jpg')", quote: "Świat jest piękny, wyjdź na spacer z przyjacielem!"},
    {freeSun: true, date: new Date(2018, 10, 18), week: 46, background: "url('./src/img/180720_niedziela_handlowa_zdj4.jpg')", background_mobile: "url('./src/img/sebastian-garcia-247546-unsplash.jpg')", quote: "Świat jest piękny, wyjdź na spacer z przyjacielem!"},
    {freeSun: false, date: new Date(2018, 10, 25), week: 47, background: "url('./src/img/180720_niedziela_handlowa_zdj2.jpg')", background_mobile: "url('./src/img/anna-utochkina-672220-unsplash.jpg')", quote: "Biegnij do sklepu, świat za oknem poczeka..."},
    {freeSun: false, date: new Date(2018, 11, 2), week: 48, background: "url('./src/img/180720_niedziela_handlowa_zdj1.jpg')", background_mobile: "url('./src/img/frankie-cordoba-526925-unsplash.jpg')", quote: "Biegnij do sklepu, świat za oknem poczeka..."},
    {freeSun: true, date: new Date(2018, 11, 9), week: 49, background: "url('./src/img/180720_niedziela_handlowa_zdj3.jpg')", background_mobile: "url('./src/img/evan-kirby-226482-unsplash.jpg')", quote: "Świat jest piękny, wyjdź na spacer z przyjacielem!"},
    {freeSun: false, date: new Date(2018, 11, 16), week: 50, background: "url('./src/img/180720_niedziela_handlowa_zdj2.jpg')", background_mobile: "url('./src/img/anna-utochkina-672220-unsplash.jpg')", quote: "Biegnij do sklepu, świat za oknem poczeka..."},
    {freeSun: false, date: new Date(2018, 11, 23), week: 51, background: "url('./src/img/180720_niedziela_handlowa_zdj1.jpg')", background_mobile: "url('./src/img/frankie-cordoba-526925-unsplash.jpg')", quote: "Biegnij do sklepu, świat za oknem poczeka..."},
    {freeSun: false, date: new Date(2018, 11, 30), week: 52, background: "url('./src/img/180720_niedziela_handlowa_zdj2.jpg')", background_mobile: "url('./src/img/anna-utochkina-672220-unsplash.jpg')", quote: "Biegnij do sklepu, świat za oknem poczeka..."},
    {freeSun: true, date: new Date(2019, 12, 6), week: 1, background: "url('./src/img/180720_niedziela_handlowa_zdj4.jpg')", background_mobile: "url('./src/img/sebastian-garcia-247546-unsplash.jpg')", quote: "Świat jest piękny, wyjdź na spacer z przyjacielem!"},
    {freeSun: true, date: new Date(2019, 12, 13), week: 2, background: "url('./src/img/180720_niedziela_handlowa_zdj3.jpg')", background_mobile: "url('./src/img/evan-kirby-226482-unsplash.jpg')", quote: "Świat jest piękny, wyjdź na spacer z przyjacielem!"},
    {freeSun: true, date: new Date(2019, 12, 20), week: 3, background: "url('./src/img/180720_niedziela_handlowa_zdj4.jpg')", background_mobile: "url('./src/img/sebastian-garcia-247546-unsplash.jpg')", quote: "Świat jest piękny, wyjdź na spacer z przyjacielem!"},
    {freeSun: false, date: new Date(2018, 12, 27), week: 4, background: "url('./src/img/180720_niedziela_handlowa_zdj1.jpg')", background_mobile: "url('./src/img/frankie-cordoba-526925-unsplash.jpg')", quote: "Biegnij do sklepu, świat za oknem poczeka..."},
    {freeSun: true, date: new Date(2019, 1, 3), week: 5, background: "url('./src/img/180720_niedziela_handlowa_zdj3.jpg')", background_mobile: "url('./src/img/evan-kirby-226482-unsplash.jpg')", quote: "Świat jest piękny, wyjdź na spacer z przyjacielem!"},
    {freeSun: true, date: new Date(2019, 1, 10), week: 6, background: "url('./src/img/180720_niedziela_handlowa_zdj4.jpg')", background_mobile: "url('./src/img/sebastian-garcia-247546-unsplash.jpg')", quote: "Świat jest piękny, wyjdź na spacer z przyjacielem!"},
    {freeSun: true, date: new Date(2019, 1, 17), week: 7, background: "url('./src/img/180720_niedziela_handlowa_zdj3.jpg')", background_mobile: "url('./src/img/evan-kirby-226482-unsplash.jpg')", quote: "Świat jest piękny, wyjdź na spacer z przyjacielem!"},
    {freeSun: false, date: new Date(2018, 1, 24), week: 8, background: "url('./src/img/180720_niedziela_handlowa_zdj2.jpg')", background_mobile: "url('./src/img/anna-utochkina-672220-unsplash.jpg')", quote: "Biegnij do sklepu, świat za oknem poczeka..."},
    {freeSun: true, date: new Date(2019, 2, 3), week: 9, background: "url('./src/img/180720_niedziela_handlowa_zdj4.jpg')", background_mobile: "url('./src/img/sebastian-garcia-247546-unsplash.jpg')", quote: "Świat jest piękny, wyjdź na spacer z przyjacielem!"},
    {freeSun: true, date: new Date(2019, 2, 10), week: 10, background: "url('./src/img/180720_niedziela_handlowa_zdj3.jpg')", background_mobile: "url('./src/img/evan-kirby-226482-unsplash.jpg')", quote: "Świat jest piękny, wyjdź na spacer z przyjacielem!"},
    {freeSun: true, date: new Date(2019, 2, 17), week: 11, background: "url('./src/img/180720_niedziela_handlowa_zdj4.jpg')", background_mobile: "url('./src/img/sebastian-garcia-247546-unsplash.jpg')", quote: "Świat jest piękny, wyjdź na spacer z przyjacielem!"},
    {freeSun: true, date: new Date(2019, 2, 24), week: 12, background: "url('./src/img/180720_niedziela_handlowa_zdj3.jpg')", background_mobile: "url('./src/img/evan-kirby-226482-unsplash.jpg')", quote: "Świat jest piękny, wyjdź na spacer z przyjacielem!"},
    {freeSun: false, date: new Date(2018, 2, 31), week: 13, background: "url('./src/img/180720_niedziela_handlowa_zdj1.jpg')", background_mobile: "url('./src/img/frankie-cordoba-526925-unsplash.jpg')", quote: "Biegnij do sklepu, świat za oknem poczeka..."},
    {freeSun: true, date: new Date(2019, 3, 7), week: 14, background: "url('./src/img/180720_niedziela_handlowa_zdj4.jpg')", background_mobile: "url('./src/img/sebastian-garcia-247546-unsplash.jpg')", quote: "Świat jest piękny, wyjdź na spacer z przyjacielem!"},
    {freeSun: false, date: new Date(2018, 3, 14), week: 15, background: "url('./src/img/180720_niedziela_handlowa_zdj2.jpg')", background_mobile: "url('./src/img/anna-utochkina-672220-unsplash.jpg')", quote: "Biegnij do sklepu, świat za oknem poczeka..."},
    {freeSun: true, date: new Date(2019, 3, 21), week: 16, background: "url('./src/img/180720_niedziela_handlowa_zdj3.jpg')", background_mobile: "url('./src/img/evan-kirby-226482-unsplash.jpg')", quote: "Świat jest piękny, wyjdź na spacer z przyjacielem!"},
    {freeSun: false, date: new Date(2018, 3, 28), week: 17, background: "url('./src/img/180720_niedziela_handlowa_zdj1.jpg')", background_mobile: "url('./src/img/frankie-cordoba-526925-unsplash.jpg')", quote: "Biegnij do sklepu, świat za oknem poczeka..."},
    {freeSun: true, date: new Date(2019, 4, 5), week: 18, background: "url('./src/img/180720_niedziela_handlowa_zdj4.jpg')", background_mobile: "url('./src/img/sebastian-garcia-247546-unsplash.jpg')", quote: "Świat jest piękny, wyjdź na spacer z przyjacielem!"},
    {freeSun: true, date: new Date(2019, 4, 12), week: 19, background: "url('./src/img/180720_niedziela_handlowa_zdj3.jpg')", background_mobile: "url('./src/img/evan-kirby-226482-unsplash.jpg')", quote: "Świat jest piękny, wyjdź na spacer z przyjacielem!"},
    {freeSun: true, date: new Date(2019, 4, 19), week: 20, background: "url('./src/img/180720_niedziela_handlowa_zdj4.jpg')", background_mobile: "url('./src/img/sebastian-garcia-247546-unsplash.jpg')", quote: "Świat jest piękny, wyjdź na spacer z przyjacielem!"},
    {freeSun: false, date: new Date(2018, 4, 26), week: 21, background: "url('./src/img/180720_niedziela_handlowa_zdj2.jpg')", background_mobile: "url('./src/img/anna-utochkina-672220-unsplash.jpg')", quote: "Biegnij do sklepu, świat za oknem poczeka..."},
    {freeSun: true, date: new Date(2019, 5, 2), week: 22, background: "url('./src/img/180720_niedziela_handlowa_zdj3.jpg')", background_mobile: "url('./src/img/evan-kirby-226482-unsplash.jpg')", quote: "Świat jest piękny, wyjdź na spacer z przyjacielem!"},
    {freeSun: true, date: new Date(2019, 5, 9), week: 23, background: "url('./src/img/180720_niedziela_handlowa_zdj4.jpg')", background_mobile: "url('./src/img/sebastian-garcia-247546-unsplash.jpg')", quote: "Świat jest piękny, wyjdź na spacer z przyjacielem!"},
    {freeSun: true, date: new Date(2019, 5, 16), week: 24, background: "url('./src/img/180720_niedziela_handlowa_zdj3.jpg')", background_mobile: "url('./src/img/evan-kirby-226482-unsplash.jpg')", quote: "Świat jest piękny, wyjdź na spacer z przyjacielem!"},
    {freeSun: true, date: new Date(2019, 5, 23), week: 25, background: "url('./src/img/180720_niedziela_handlowa_zdj4.jpg')", background_mobile: "url('./src/img/sebastian-garcia-247546-unsplash.jpg')", quote: "Świat jest piękny, wyjdź na spacer z przyjacielem!"},
    {freeSun: false, date: new Date(2018, 5, 30), week: 26, background: "url('./src/img/180720_niedziela_handlowa_zdj1.jpg')", background_mobile: "url('./src/img/frankie-cordoba-526925-unsplash.jpg')", quote: "Biegnij do sklepu, świat za oknem poczeka..."}
    ];

  // for TESTING - $scope.sundays
  angular.forEach($scope.sundays, function (val){
    // STORES CLOSED
    if(val.week == $scope.currentWeek && val.freeSun){
      $scope.closed = true;
      $scope.sundayDate = new Date(val.date);
      $scope.quote = val.quote;
      // STYLES change:
      $scope.background = {
        "background-image" : val.background,
        "background-repeat" : "no-repeat",
        "background-position" : "center",
        "background-size" : "cover"
      }
      $scope.background_mobile = {
        "background" : val.background_mobile,
        "background-repeat" : "no-repeat",
        "background-position" : "center",
        "background-size" : "cover"
      }
      $scope.CircleBlackOrWhite = {
        "background" : "black"
      }
      $scope.blackOrWhite = {
        "background" : "white",
        "color" : "black"
      }

      console.log('found the week! Sunday OFF', $scope.sundayDate);
      console.log('background: ', $scope.background);

    }
    // STORES OPEN
    else if(val.week == $scope.currentWeek && !val.freeSun){
      $scope.sundayDate = new Date(val.date);
      $scope.quote = val.quote;
      // STYLES change:
      $scope.background = {
        "background-image" : val.background,
        "background-repeat" : "no-repeat",
        "background-position" : "center",
        "background-size" : "cover"
      }
      $scope.background_mobile = {
        "background" : val.background_mobile,
        "background-repeat" : "no-repeat",
        "background-position" : "center",
        "background-size" : "cover"
      }
      $scope.CircleBlackOrWhite = {
        "background" : "white"
      }
      $scope.blackOrWhite = {
        "background" : "black",
        "color" : "white"
      }

      console.log('WORKING Sunday', $scope.sundayDate);
      console.log('background: ', $scope.background);
    }

  })

}]);

// WINDOW WIDTH WATCH
app.directive('windowSize', function ($window) {
  return function (scope, element) {
    scope.getWindowDimensions = function () {
        console.log('f.getWindowDimensions: WIDTH:', $window.innerWidth);
        console.log('f.getWindowDimensions: HEIGHT:', $window.innerHeight);
        return {
            'h': $window.innerHeight,
            'w': $window.innerWidth
        };
    };
    scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
      scope.windowHeight = newValue.h;
      scope.windowWidth = newValue.w;
      scope.style = function () {
          return {
              'height': (newValue.h - 100) + 'px',
              'width': (newValue.w - 100) + 'px'
          };
      };
    }, true);

    angular.element($window).bind('resize', function () {
        scope.$apply();
    });
  }
})
