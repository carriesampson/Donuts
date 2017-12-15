const app = angular.module('DonutsApp', []);
//---------------------------

app.controller('MainController', function() {
//---------------------------
  this.test = "Hello world!";
  console.log("App.JS is Connected");

    this.createForm = {}

    this.donut = '';

    this.createDonut = () => {
      console.log('submit button calls this fxn');

      $http({
        method : 'POST',
        url : '/donuts',
        data : this.createForm
      }).then( response => {
        this.donuts.push(response.data);
        //empties form after submission
        this.createForm = {};
    }, error => {
      console.error( error.message );
    }).catch (err => console.log('Catch: ', err));
  }

  this.getDonuts = () => {
    $http({
      method : 'GET',
      url : '/donuts'
    }).then ( response => {
      this.donuts = response.data;
      this.donut = this.donuts[0];
      console.table(this.donuts);
    }, error => {
      console.error(error.message);
    }).catch(err => console.error ( 'Catch:', err))
  }

  //load immediately on page load
  this.getDonuts();

  //delete tds
  this.deleteDonut = (id) => {
    console.log("I'm going to delete you!");

    $http({
      method : 'DELETE',
      url : '/donuts/' + id
    }).then( response => {
      // console.table(response.data);
      const removeByIndex = this.donuts.findIndex(donut => donut._id ===id);
      this.donuts.splice(removeByIndex, 1);
      console.log('this is the array index number of the donut i want to delete', removeByIndex);
    }, error =>{ console.error (error.message)
    }).catch(err => console.error ('Catch: ', err));
  }

//Update donuts as eaten
  // this.updateEaten = (donut) => {
  //   console.log("Let's eat", donut.name, "!");
  //   donut.eaten = !donut.eaten;
  //   // console.log(holiday.celebrated);
  //
  //   $http({
  //     method : 'PUT',
  //     url : '/donuts/' + donut._id,
  //     data : {eaten : donut.eaten}
  //   }).then ( response => {
  //     console.log(response.data.eaten);
  //   }, error => {
  //     console.log(error.message);
  //   }).catch ( err => console.error ('Catch:', err))
  // }

  this.chooseOneDonut = (donut) => {
    this.donut = donut;
    console.log(this.donut.name);
  }

//Donut likes
  this.likeDonut = (donut) => {
    donut.likes ++;

    $http({
      method : 'PUT',
      url : '/donuts/' + donut._id,
      data : {likes : donut.likes}
    }).then ( response => {
      console.log(response.data.likes);
    }, error => {
      console.log(error.message);
    }).catch ( err => console.error ('Catch:', err))
  }

}); // close app controller
