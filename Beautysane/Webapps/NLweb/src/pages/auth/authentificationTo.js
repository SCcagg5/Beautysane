import React, {Component} from 'react';
import Topbar from "../../components/TopbarRecettes";
import user from"../../assets/images/user.svg"
import add from"../../assets/images/add.svg"
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from "../../tools/customSnackBar"

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import  firebase from'firebase'
import  moment from "moment"
const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);
class Authentification extends Component {
    constructor(props){
        super(props)
        this.state={
            passwordlogin:false,
            passwordregistre:true,
            nom:"",
            prenom:"",
            regemail:"",
            regpassword:"",
            logEmail:"",
            logPassword:"",
            loadingreg:false
        }
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this)
    }
    openSnackbar = (type, msg) => {
        this.setState({
            openAlert: true,
            alertMessage: msg,
            alertType: type,
            to:""
        });
    };

    componentDidMount() {
        let to = this.props.match.params.to
        this.setState({
            to:to
        })
    }

    register(){
        this.setState({loadingreg:true})
        firebase.auth().createUserWithEmailAndPassword(this.state.regemail, this.state.regpassword).then(res => {
            // The user is registred ==> Save other user informations in a data base = firebase in /users
            firebase.database().ref('users/' + res.user.uid).set({

                prenom:this.state.prenom,
                nom:this.state.nom,
                email:this.state.regemail,
                dateCreation: moment(new Date()).format("DD/MM/YYYY"),
            }).then(data => {
                // OK ==> Redirect user to login page
                this.openSnackbar('success', 'Votre inscription est effectuée avec succès');
                this.setState({
                    isSignUp: false
                })
            }).catch(function (error) {
                alert(error);
            });

        }).catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                this.openSnackbar('warning', 'Adresse mail est déja utilisé.');
            } else {
                this.openSnackbar('error', error.message);
            }
        });
    }

    login(){
        firebase.auth().signInWithEmailAndPassword(this.state.logEmail, this.state.logPassword).then( res => {
            //console.log(res.user.uid,res.user.email);
            localStorage.setItem('uid',res.user.uid);
            localStorage.setItem('email',res.user.email);


            firebase.database().ref('/users/'+res.user.uid).on('value', (snapshot) => {
                const user = snapshot.val();
                localStorage.setItem('user',JSON.stringify(user));
                localStorage.setItem('role',user.role);

                this.props.history.push('/'+this.state.to);
                console.log(user)
                this.setState({
                    loading:false
                });
            });
        }).catch(err => {
            console.log(err);

        });
    }
    handleClickShowPassword(){

        this.setState({passwordlogin:!this.state.passwordlogin})

    }
    handlechange=(name)=>(event)=>{

        this.setState({[name]:event.target.value})

    }
    handleMouseDownPassword(){

    }
    render() {

        return (
            <div>
                <Topbar></Topbar>

                <div className="wrapper" >
                   <div className="container bg-white">
                       <div className="row">
                           <div className="col-md-6">
                               <div className="row align-items-center">
                                   <div className="col-md-auto">
                                   <h3>
                                       DÉJÀ CLIENT
                                   </h3>
                                   </div>
                                   <div className="col-md-1">
                                       <img alt="" src={user} style={{width:20}}/>
                                   </div>
                               </div>

                               <div className="container p-4" style={{backgroundColor:"#f2f2f2"}}>

                                   <TextField  style={{width:"100%",backgroundColor:"white" ,borderColor:"green"}} id="outlined-success" label="Adresse e-mail" value={this.state.logEmail} onChange={this.handlechange('logEmail')} required={true} variant="outlined" />

                                   <FormControl style={{marginTop:"8%",backgroundColor:"white" ,width:"100%"}} variant="outlined">
                                       <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                       <OutlinedInput
                                           id="outlined-adornment-password"
                                           type={this.state.passwordlogin ? 'text' : 'password'}
                                           value={this.state.logPassword}
                                           onChange={this.handlechange('logPassword')}
                                           endAdornment={
                                               <InputAdornment position="end">
                                                   <IconButton
                                                       aria-label="toggle password visibility"
                                                       onClick={this.handleClickShowPassword}
                                                       onMouseDown={this.handleMouseDownPassword}
                                                       edge="end"
                                                   >
                                                       {this.state.passwordlogin ? <Visibility /> : <VisibilityOff />}
                                                   </IconButton>
                                               </InputAdornment>
                                           }
                                           labelWidth={70}
                                       />
                                   </FormControl>

                                   <div className="text-right mt-2">
                                       <label className="text-right" style={{cursor:"pointer"}}>
                                           <u>Mot de passe oublier</u>
                                       </label>
                                   </div>

                                   <div>
                                       <Button onClick={()=>{this.login()}} style={{width:"100%",backgroundColor:"#00ba4c"}} variant="contained"  color="primary" disableElevation>
                                           Se connecter
                                       </Button>
                                   </div>



                               </div>

                           </div>
                           <div className="col-md-6">
                               <div className="row align-items-center">
                                   <h3>
                                       NOUVEAU CLIENT
                                   </h3>
                                   <div className="col-md-1">
                                       <img alt ="" src={add} style={{width:20}}/>
                                   </div>
                               </div>

                               <div className="container p-4" style={{backgroundColor:"#f2f2f2"}}>
                                   <TextField  style={{width:"100%",backgroundColor:"white" ,borderColor:"green"}} id="outlined-success" label="Nom" required={true} value={this.state.nom} onChange={this.handlechange('nom')} variant="outlined" />
                                   <TextField  style={{width:"100%",backgroundColor:"white" ,borderColor:"green",marginTop:"5%"}} id="outlined-success" label="Prenom" value={this.state.prenom} onChange={this.handlechange('prenom')} required={true} variant="outlined" />


                                   <TextField  style={{width:"100%",backgroundColor:"white" ,borderColor:"green",marginTop:"5%"}} id="outlined-success" label="Adresse e-mail" onChange={this.handlechange('regemail')} value={this.state.regemail} required={true} variant="outlined" />

                                   <FormControl style={{marginTop:"8%",backgroundColor:"white" ,width:"100%"}} variant="outlined">
                                       <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                       <OutlinedInput
                                           id="outlined-adornment-password"
                                           type={this.state.passwordlogin ? 'text' : 'password'}
                                           value={this.state.regpassword}
                                           onChange={this.handlechange('regpassword')}
                                           endAdornment={
                                               <InputAdornment position="end">
                                                   <IconButton
                                                       aria-label="toggle password visibility"
                                                       onClick={this.handleClickShowPassword}
                                                       onMouseDown={this.handleMouseDownPassword}
                                                       edge="end"
                                                   >
                                                       {this.state.passwordlogin ? <Visibility /> : <VisibilityOff />}
                                                   </IconButton>
                                               </InputAdornment>
                                           }
                                           labelWidth={70}
                                       />
                                   </FormControl>

                                   <FormControlLabel
                                       style={{marginTop:"5%"}}
                                       control={<GreenCheckbox checked={true}  name="checkedG" />}
                                       label="Oui, je souhaite être informé des promotions, des bons d'achat et des nouveautés par e-mail Désabonnement possible à tout moment"
                                   />

                                   <div className="mt-3">
                                       <Button onClick={()=>{this.register()}} loading={this.state.loadingreg} style={{width:"100%",backgroundColor:"#00ba4c"}} variant="contained"  color="primary" >
                                           S'enregistrer
                                       </Button>
                                   </div>



                               </div>

                           </div>

                       </div>
                   </div>

                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.openAlert}
                    autoHideDuration={3000}
                    onClose={this.closeSnackbar}
                >
                    <MySnackbarContentWrapper
                        onClose={this.closeSnackbar}
                        variant={this.state.alertType}
                        message={this.state.alertMessage}
                    />
                </Snackbar>

            </div>
        );
    }
}

export default Authentification;
