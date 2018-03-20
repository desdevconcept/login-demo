import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.register.events({
  'submit form': function(event, template)
  {
    event.preventDefault();
    var usernamevar = template.find('#username').value;
    var passwordvar = template.find('#password').value;
    var user = {username: usernamevar, password: passwordvar};
    var $this = $('#loginform_id'),
    $state = $('#state_id');
    Accounts.createUser(user,function(err){
      if(err)
      {
        $this.addClass('loading');
        console.log('mareng gane gad si bhey!');
        $state.html('Registration Failed! <br><br> Username Already Exist!');
        console.log(err);
        setTimeout(function() {
          $state.html('Log in');
          $this.removeClass('ok loading');
        }, 4000);
      }else {

      }
    });
  }
});
Template.log_in.events({

  'click #log_in_butt': function(event, template)
  {
    event.preventDefault();

    var usernamevar = template.find('#log_username').value;
    var passwordvar = template.find('#log_password').value;
    var $this = $('#loginform_id'),
    $state = $('#state_id');
      $this.addClass('loading');
      $state.html('Loading Accounts');
      console.log('ta checkya si mareng si bhey!');

      setTimeout(function()
      {

          Meteor.loginWithPassword(usernamevar,passwordvar,function(err)
          {
              if(err)
              {

                console.log('mareng gane gad si bhey!');
                $state.html('Log In Failed! <br><br> Invalid Username or Password');
                console.log('login failed');
                console.log(err);
                setTimeout(function() {
                  $state.html('Log in');
                  $this.removeClass('ok loading');
                }, 4000);

              }
              else {

                $this.removeClass('ok loading');
              }
          });
      }, 3000);
  }
});

Template.log_out.events({
  'click #log_in_butt': function (event)
  {
    event.preventDefault();
    Meteor.logout();
  }
});
