import React, { useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';

export default function GoogleLoginButton(props) {


    const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

    const url ="/api/";
    //const url = "http://localhost:5052/";
    const headers = {
        headers: {
            'Content-Type': 'application/json',
        }
      }


    const handleLogin = (googleData) => {
        console.log(googleData);


        
        console.log("attempting verification...");


        //custom verification
        /*
        var json = JSON.stringify({
            Id: googleData.tokenId
        });

        axios.post(url +"login/verify", json, headers)
        .then(function (response) {
            console.log("user verified!");

            var data = JSON.parse(response.data);
            console.log(data);

            console.log("attempting save...");
            storeData(data);

        })
        .catch(function (error) {
            console.log(error);
        });*/

        axios.get(
            'https://www.googleapis.com/oauth2/v2/userinfo?access_token=' + googleData.accessToken

        )
        .then(function (response) {
            console.log("user verified!");
            console.log(response);

            console.log("attempting save...");
            storeData(response.data);

        })
        .catch(function (error) {
            console.log(error);
        });
    }

    useEffect(function () {
        //console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
    }, [])

    const storeData = (payload) => {
    
        var data = {
            name: payload.name,
            userId: payload.id,
            email: payload.email,
            picture: payload.picture
        }

        props.handleLogin(data);

        var recordJson = JSON.stringify(data);



        console.log(recordJson);

        //checks if record exists based on UserID -> returns true or false
        console.log("pinging /login/exists...")
        axios.post(url + "login/exists", recordJson, headers)
        .then( function (response) {
            console.log("login ping successful!");
            console.log(response);

            //if exists, update, otherwise, create
            if(response.data) update(recordJson);
            else create(recordJson);
        })
        .catch( function (error) {
            console.log ("login ping failed");

            console.log(error);

            if(error.response)
            {
                console.log(error.response);
                console.log(error.response.data);
            }
        })

        const create = (recordJson) => {

            console.log("attempting login create...")
            axios.post(url + "login/create", recordJson, headers)
            .then(function (response) {
                console.log("create successful!");
                console.log(response);

            })
            .catch(function (error) {
                console.log("login create failed");

                console.log(error);

                if(error.response)
                console.log(error.response);
            });
        }

        const update = (recordJson) => {

            console.log("attempting login update...")
            axios.post(url + "login/edit", recordJson, headers)
            .then(function (response) {
                console.log("update successful!");
                console.log(response);

            })
            .catch(function (error) {
                console.log("login update failed");

                console.log(error);

                if(error.response)
                console.log(error.response);
            });

        }

    }

    const handleFailure = (error) => {
        console.log(error);
    }

    return (
        <div>
            <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={'single_host_origin'}
            prompt='login'
            ></GoogleLogin>

        </div>
    )
}
