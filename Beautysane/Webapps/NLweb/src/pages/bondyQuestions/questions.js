import React, {Component} from 'react';
import './index.css'
import  QuestionService from "../../provider/webserviceQuestions"
import Snackbar from "@material-ui/core/Snackbar"
import MySnackbarContentWrapper from "../../tools/customSnackBar";
import data from "./data"
import firebase from "firebase";
import Topbar from "../../components/Topbar1Food1Me";
const url = process.env.REACT_APP_endpoint
class Questions extends Component {
    constructor(props) {
        super(props);
        this.state={
            openAlert: false,
            alertMessage: "",
            alertType: "",
            progressbar:"0%",
            questions:data,
            questionN:0,
            back:"<",
            genre:"",
            data :{
                genre:"",
                objectif:"",
                poids:"",
                taille:"",
                nbSport:"",
                cuisine:"",
                fruit:"",
                proteines:"",
                laitiers:"",
                feculents:"",
            }


        }
    }

sendMail(){
/*
    let dd={
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
    })

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
*/

let dataa = {
    email:"jawher.zairi@sesame.com.tn",
    nom:"zairi jawher"

}
    fetch(url+'sendNlmMailWithUrl2', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataa)
    }).then((response)=> {
        console.log(response)
        if (response.status===200){
            this.setState({openAlert:true,alertMessage:"BodyCheck creer avec success",alertType:'success'})

        }


    })


}



    componentDidMount() {

     /*   let uid = localStorage.getItem('uid')
        if (uid=== undefined || uid ===""|| uid ===null){
            this.props.history.push('/login/questions')
        }

      */

     /*   firebase.database().ref('questions').on('value',  (snapshot)=> {

            const quests = snapshot.val()

            let arrayquest=[]
            for ( let i=0 ; i<quests.length;i++){
                arrayquest.push(quests[i])

            }

            this.setState({questions:arrayquest})




        })

      */

    }

    selected(number,key){
        let rep = this.state.questions

        if (rep[number].repType==="viande"){
            rep[number].responses.viande.map((item)=>{
                item.selected="false"
                return "chab"
            })

            rep[number].rep = rep[number].responses.viande[key].text
            rep[number].responses.viande[key].selected = "true"
            this.setState({
                questions: rep,
                questionN: parseInt(rep[number].next)
            })


        }else {
            rep[number].responses.map((item)=>{
                item.selected="false"
                return "chab"
            })


            rep[number].rep = rep[number].responses[key].text
            rep[number].responses[key].selected = "true"
            this.setState({
                questions: rep,
                questionN: parseInt(rep[number].next)
            })

        }





    }


    changeText(number,key,event){
        let rep = this.state.questions
        rep[number].rep=event.target.value


        rep[number].responses[key].response=event.target.value
        this.setState({questions:rep})


        console.log(rep[number])



    }
 next(number){
        if (this.state.questionN===this.state.questions.length-1){
            this.sendMail()
        }else {
            this.setState({questionN: this.state.questions[number].next})
        }
 }


    render() {



        let number = this.state.questionN
        let pb=(100/(this.state.questions.length-1))*number



        return (

            <div>

                <div className="header">
                    <Topbar></Topbar>
                </div>
                <div className="wrapper text-center">

                {(number < this.state.questions.length) &&

                <div className="containerSM " >

                    <div className="progress ml-auto mr-auto w-75 " >
                        <div className="progress-bar" role="progressbar" style={{width: pb + "%", backgroundColor: "#f17549"}}
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
                                            className={item.selected === "true" ? "btn  outlineFood activee mt-1 " : "btn outlineFood inactivee mt-1"}
                                            style={{width: "80%", marginTop: "10%"}}>{item.text}</button>
                                ))}
                                {this.state.questions[number].repType === "viande" &&
                                this.state.questions[number].responses.viande.map((item, key) => (
                                    <button onClick={() => this.selected(number, key)}
                                            className={item.selected === "true" ? "btn outlineFood activee mt-1 " : "btn outlineFood  inactivee mt-1"}
                                            style={{width: "80%", marginTop: "10%"}}>{item.text}</button>
                                ))}
                                {this.state.questions[number].repType === "text" &&
                                this.state.questions[number].responses.map((item, key) => (
                                    <div>
                                        <div className="text-left">
                                            <text style={{color:"#f17549"}}>{item.text}</text>
                                        </div>

                                        <input style={{borderColor:"#f17549"}} placeholder={item.placeholder} value={item.response != null ? item.response : ""}
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

                                        <input placeholder={item.placeholder} value={localStorage.getItem('email')}
                                               onChange={(e) => this.changeText(number, key, e)} type="email"
                                               className="form-control mt-2"
                                        />
                                        <button onClick={() => this.sendMail()}
                                                className={item.selected === "true" ? "btn btn-outline-success mt-1 active" : "btn btn-outline-success inactive mt-1"}
                                                style={{width: "80%", marginTop: "10%"}}>Recevoir L'evaluation par email</button>
                                    </div>


                                ))}

                            </div>

                        </div>
                    }






                    <div className="row  justify-content-center bottomButton bottomButtonSM">
                        <div className="col-3">
                            <button onClick={() => this.setState({questionN: this.state.questions[number].prec})} type="button" className="btn btn-outline-dark font-weight-bold" style={{width: "100%"}} > {this.state.back}</button>

                        </div>
                        <div className="col-6">
                            <button onClick={() =>{this.next(number)}} type="button" className="btn btn-danger " style={{width: "100%",backgroundColor:"#f17549"}}> PAGE SUIVANTE</button>

                        </div>

                    </div>

                </div>
                }






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

            </div>

        );
    }
}

export default Questions;
