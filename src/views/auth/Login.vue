<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" class="form-control" v-model="input.username" placeholder="Username" autocomplete="username email" />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" class="form-control"  v-model="input.password" placeholder="Password" autocomplete="current-password" />
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button variant="primary"  v-on:click="login()" class="px-4">Login</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Forgot password?</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <b-button variant="primary" class="active mt-3">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "./../../../app.config.js";

export default {
  name: "Login",
  data() {
    return {
      input: {
        username: "vinod@gmail.com",
        password: "vinod123"
      }
    };
  },
  methods: {
    login() {
      
      if (this.input.username != "" && this.input.password != "") {
        var postData = {};
        postData.email = this.input.username;
        postData.password = this.input.password;

        axios
          .post(
            config.apiUrl + "/users/login",
            postData, // the data to post
            {
              headers: {
                "Content-type": "application/json" 
              }
            }
          )
          .then(response => {
            if( response.status == 200 ){
              gTest = response;
              const checkAuth = response.headers && response.headers[ "x-auth" ];
              const checkResponse = response.data;
              const checkType = response.data.type && response.data.type == 1;

              if( checkAuth && checkResponse && checkType ){
                  localStorage.setItem( "auth-token" , response.headers[ "x-auth" ] );
                  localStorage.setItem( "user" , JSON.stringify( response.data ) );
                  
                  this.$router.push( "/dashboard" );
              }
            }
          }).catch( ( err ) => {
            console.log( err );
          });
      } else {
        console.log("A username and password must be present");
      }
    }
  }
};
</script>
