import React, {Component} from 'react';
import NlTopbar from "../../components/NlTopbar";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import firebase from "firebase";
import data from './data'
import "./stylesport.css"
import QuestionService from "../../provider/webserviceQuestions";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "../../tools/customSnackBar";
const url = process.env.REACT_APP_endpoint

class BilanSport extends Component {
    constructor(props){
        super(props)
        this.state={
            questions:data,
            questionN:0,
            progressbar:"0%",
            back:"<",
            openAlert:false,
            alertMessage:"",
            alertType:'success'

        }
        this.closeSnackbar=this.closeSnackbar.bind(this)

    }

    closeSnackbar(){
        this.setState({openAlert:false})
    }
    sendMail(){

        /*  let dd={
              emailReciver:"jawher.zairi@sesame.com.tn",
              subject:"bodycheckNL",
              linkUrl :"http://localhost:3001/api/generateDoc",
              url:"http://localhost:3001/api/generateDoc",
              msg:"document de votre bodycheck NL ",
              footerMsg : "merci"
          }

          fetch('http://localhost:3001/api/sendCustomMailWithUrl', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body:JSON.stringify(dd)
          }).then(response => response.json()).catch(error => {
              console.log(error);
          })*/



        let user_id = localStorage.getItem('uid')
        let quest = this.state.questions
        let questions = {
            id_user:user_id,
            info_perso : quest[0].rep,
            alimentation1 : quest[1].rep,
            alimentation2   :quest[2].rep,
            budget_alimen   : quest[3].rep,
            consom_feculent        : quest[4].rep ,
            consom_legume        : quest[5].rep,
            consom_fruit     : quest[6].rep,
            consom_viande  : quest[7].rep,
            consom_laitiers	  : quest[8].rep,
            consom_prod_gras : quest[9].rep,
            consom_prod_sucre  : quest[10].rep,
            consom_alcool   : quest[11].rep,
            vous_grignotez  : quest[12].rep,
            saute_repas  : quest[13].rep,
            oui_lequel  : quest[14].rep,
            activite_jour  : quest[15].rep,
            heure_sport  : quest[16].rep,
            travaill_horraire_decale : quest[17].rep,
            probleme_de : quest[18].rep,
            objectif  : quest[19].rep,
            email : quest[35].rep
        }

        let data = {
            questions : questions,
            user_id:user_id
        }

        console.log(questions)
        QuestionService.CreateQuestions(questions).then(res=> {
            if (quest[19].rep==="Minceur" && (res!=null && res!=undefined)){
                let miniceur={
                    question_id : res.data,
                    poids_souhaite:quest[20].rep,
                    ou_surpoids:quest[21].rep,
                    cause_surpoids:quest[23].rep,
                    souffrez_pathologies:quest[26].rep,
                    fumer_reg:quest[29].rep,
                    arret_fumer:quest[30].rep,
                    age:quest[31].rep,
                    taille: quest[32].rep,
                    poids : quest[33].rep,

                }

                QuestionService.CreateMiniceur(miniceur).then(res => {console.log(res)}).then(()=>
                    this.setState({openAlert:true,alertMessage:"BodyCheck creer avec success",alertType:'success'})
                )
            }else if (quest[19].rep==="Sport" && (res!=null && res!=undefined)){
                let sport = {
                    question_id : res.data,
                    motivation:quest[24].rep,
                    souffrez_pathologies:quest[26].rep,
                    fumer_reg:quest[29].rep,
                    arret_fumer:quest[30].rep,
                    age:quest[31].rep,
                    taille: quest[32].rep,
                    poids : quest[33].rep,


                }
                QuestionService.CreateSport(sport).then(res => {console.log(res)}).then(()=>
                    this.setState({openAlert:true,alertMessage:"BodyCheck creer avec success",alertType:'success'})
                )
            }else if (quest[19].rep==="Bien-être" && (res!=null && res!=undefined)){
                let BienEtre = {
                    question_id : res.data,
                    motivation:quest[25].rep,
                    souffrez_pathologies:quest[26].rep,
                    fumer_reg:quest[29].rep,
                    arret_fumer:quest[30].rep,
                    age:quest[31].rep,
                    taille: quest[32].rep,
                    poids : quest[33].rep,


                }
                QuestionService.CreateBienEtre(BienEtre).then(res => {console.log(res)}).then(()=>
                    this.setState({openAlert:true,alertMessage:"BodyCheck creer avec success",alertType:'success'})
                )
            }
        })



        fetch(url+'sendNlmMailWithUrl', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.questions)
        }).then((response)=> {

            console.log(response.json())



        })

        console.log(this.state.questions)

    }
    selected(number,key){
        let rep = this.state.questions
        rep[number].responses.map((item)=>{
            item.selected="false"
            return "chab"
        })

        if (rep[number].responses[key].text==="HOMME"){

            rep[number].responses[key].selected="true"
            rep[number].rep=rep[number].responses[key].text
            this.setState({questions:rep,
                questionN:rep[number].next,
                genre:"HOMME"})


        }else if(rep[number].responses[key].text==="FEMME"){
            rep[number].responses[key].selected="true"
            rep[number].rep=rep[number].responses[key].text
            this.setState({questions:rep,
                questionN:rep[number].next,
                genre:"FEMME"})
        }else if(rep[number].responses[key].text==="Minceur"){
            rep[number].responses[key].selected="true"
            rep[number].rep=rep[number].responses[key].text
            this.setState({questions:rep,
                questionN:20})
        }else if(rep[number].responses[key].text==="Sport"){
            rep[number].rep=rep[number].responses[key].text
            rep[number].responses[key].selected="true"
            this.setState({questions:rep,
                questionN:24})
        }else if(rep[number].responses[key].text==="Bien-être"){
            rep[number].rep=rep[number].responses[key].text
            rep[number].responses[key].selected="true"
            this.setState({questions:rep,
                questionN:25})
        }else if(rep[number].question==="Où se situe votre surpoids ?" && this.state.genre==="FEMME"){
            rep[number].rep=rep[number].responses[key].text
            rep[number].responses[key].selected="true"
            this.setState({questions:rep,
                questionN:  22})
        }else if(rep[number].question==="Où se situe votre surpoids ?" && this.state.genre==="HOMME"){
            rep[number].rep=rep[number].responses[key].text
            rep[number].responses[key].selected="true"
            this.setState({questions:rep,
                questionN:  23})
        }else if(rep[number].question==="Souffrez-vous des pathologies suivante ?" && rep[number].responses[key].text==="Autre Pathalogie"){
            rep[number].rep=rep[number].responses[key].text
            rep[number].responses[key].selected="true"
            this.setState({questions:rep,
                questionN:  27})
        }else if(rep[number].question==="FUMEZ-VOUS RÉGULIÉREMENT ?" && rep[number].responses[key].text==="OUI"){
            rep[number].rep=rep[number].responses[key].text
            rep[number].responses[key].selected="true"
            this.setState({questions:rep,
                questionN:  30})
        }
        else{
            rep[number].rep=rep[number].responses[key].text
            rep[number].responses[key].selected="true"
            this.setState({questions:rep,
                questionN:parseInt(rep[number].next)})



        }





    }
    changeText(number,key,event){
        let rep = this.state.questions
        rep[number].rep=event.target.value


        rep[number].responses[key].response=event.target.value
        this.setState({questions:rep})




    }
    render() {
        let number = this.state.questionN
        let pb=(100/(this.state.questions.length-1))*number

        return (
            <div>
                <div className="header">
                    <NlTopbar page="bodycheck"></NlTopbar>

                </div>
                <div className="wrapper pb-5">
                    <div className="container">

                        <div className="row">
                            <div className="col-md-6">
                                <div style={{maxWidth:"60%"}}>
                                    <h1 style={{fontWeight:"normal",fontSize:35,fontFamily:"goudar_hlextralight ,sans-serif",textTransform:"uppercase",lineHeight:1,color:"#5ea9db"}}>
                                        ACCROÎTRE VOS PERFORMANCES
                                    </h1>
                                    <text>
                                        Sportif professionnel, amateur ou sportif du dimanche, relevez vos défis et augmentez vos performances sportives en un simple geste !                                    </text>

                                    <div className="mt-3">
                                        <text style={{textTransform:"uppercase",color:"#5ea9db"}}>
                                            RECEVEZ VOTRE GUIDE MINCEUR GRATUIT
                                        </text>

                                    </div>
                                </div>


                            </div>
                            <div className="col-md-6">
                                <RadioGroup row aria-label="position" name="position" defaultValue="top">

                                    <FormControlLabel  onChange={() => this.selected(0, 0)} value="homme" control={<Radio color="primary" />} label="Homme" />
                                    <FormControlLabel onChange={() => this.selected(0, 1)} value="femme" control={<Radio color="primary" />} label="Femme" />
                                </RadioGroup>
                                <div className="row">
                                    <div className="col-md-6">
                                        <TextField onChange={(e)=>{this.changeText(31,0,e)}} value={this.state.questions[31].rep || ""} id="standard-basic" label="Mon age (en années)" />

                                    </div>
                                    <div className="col-md-6">
                                        <TextField onChange={(e)=>{this.changeText(32,0,e)}} value={this.state.questions[32].rep || ""} style={{fontWeight:"normal",fontFamily:"sans-serif"}} id="standard-basic" label="Taille (en cm)" />

                                    </div>

                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <TextField onChange={(e)=>{this.changeText(33,0,e)}} value={this.state.questions[33].rep || ""} id="standard-basic" label="Poids (en kilos)" />

                                    </div>
                                    <div className="col-md-6">
                                        <TextField onChange={(e)=>{this.changeText(35,0,e)}} value={this.state.questions[35].rep || ""} style={{fontWeight:"normal",fontFamily:"sans-serif"}} id="standard-basic" label="Mon adresse mail" />

                                    </div>

                                </div>

                            </div>

                        </div>


                    </div>
                    <div className="p-4 mt-3 mb-5" style={{backgroundColor:"white"}}>


                        {(number < this.state.questions.length) &&

                        <div className="containerSM " >

                            <div className="progress ml-auto mr-auto w-75 " >
                                <div className="progress-bar" role="progressbar" style={{width: pb + "%", backgroundColor: "#17c2ff"}}
                                     aria-valuenow="10" aria-valuemin='0'
                                     aria-valuemax="100"/>
                            </div>

                            <hr style={{width:"90%" , backgroundColor:"#a6a6a6",height:"1px"}}/>

                            {
                                (this.state.questions.length!==0)&&
                                <div style={{marginTop: "8%"}}>
                                    <text>{this.state.questions[number].question} </text>
                                    <div style={{marginTop: "10%"}}>
                                        {this.state.questions[number].repType === "button" &&
                                        this.state.questions[number].responses.map((item, key) => (
                                            <button onClick={() => this.selected(number, key)}
                                                    className={item.selected === "true" ? "btn btn-sport  activee" : "btn btn-sport  mt-1"}
                                                    style={{width: "80%", marginTop: "10%" ,color:"dark"}}>{item.text}</button>
                                        ))}
                                        {this.state.questions[number].repType === "text" &&
                                        this.state.questions[number].responses.map((item, key) => (
                                            <div>
                                                <div className="text-left">
                                                    <text>{item.text}</text>
                                                </div>

                                                <input placeholder={item.placeholder} value={item.response != null ? item.response : ""}
                                                       onChange={(e) => this.changeText(number, key, e)} type="text"
                                                       className="form-control mt-2"
                                                />
                                            </div>

                                        ))}

                                        {this.state.questions[number].repType === "email" &&
                                        this.state.questions[number].responses.map((item, key) => (
                                            <div>
                                                <div className="text-left">
                                                    <text>{item.text}</text>
                                                </div>

                                                <input placeholder={item.placeholder} value={this.state.questions[35].rep || ""}
                                                       onChange={(e) => this.changeText(number, key, e)} type="email"
                                                       className="form-control mt-2"
                                                />
                                                <div className="text-center">
                                                <button onClick={() => this.sendMail()}
                                                        className="btn btn-sport mt-2"
                                                        style={{width: "80%", marginTop: "10%"}}>Recevoir L'evaluation par email</button>
                                                </div>
                                            </div>


                                        ))}

                                    </div>

                                </div>


                            }



                         <div className="col-md-12">
                            <div className="row  justify-content-center mt-4 w-75">
                                <div className="col-3">
                                    <button onClick={() => this.setState({questionN: this.state.questions[number].prec})} type="button" className="btn btn-sport font-weight-bold" style={{width: "100%"}} > {this.state.back}</button>

                                </div>
                                <div className="col-6">
                                    <button onClick={() => this.setState({questionN: this.state.questions[number].next})} type="button" className="btn btn-success " style={{width: "100%",backgroundColor:"#17c2ff"}}> PAGE SUIVANTE</button>

                                </div>

                            </div>

                        </div>
                        </div>
                        }




                    </div>



                </div>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.openAlert}
                    autoHideDuration={5000}
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

export default BilanSport;
