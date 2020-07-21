import React, {Component} from 'react';
import './index.css'

import firebase from "firebase";
const url = process.env.REACT_APP_endpoint
class Questions extends Component {
    constructor(props) {
        super(props);
        this.state={
            progressbar:"0%",
            questions:[],
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
    fetch(url+'sendNlmMailWithUrl', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.questions)
    }).then(function(response) {
        return response.json();
    })
}



    componentDidMount() {

        firebase.database().ref('questions').on('value',  (snapshot)=> {

            const quests = snapshot.val()

            let arrayquest=[]
            for ( let i=0 ; i<quests.length;i++){
                arrayquest.push(quests[i])

            }

            this.setState({questions:arrayquest})




        })

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
            <div className="wrapper text-center">

                {(number < this.state.questions.length) &&

                <div className="containerSM " >

                <div className="progress ml-auto mr-auto w-75 " >
                    <div className="progress-bar" role="progressbar" style={{width: pb + "%", backgroundColor: "#00ba4c"}}
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
                                className={item.selected === "true" ? "btn btn-outline-success mt-1 active" : "btn btn-outline-success inactive mt-1"}
                                style={{width: "80%", marginTop: "10%"}}>{item.text}</button>
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

                                <input placeholder={item.placeholder} value={item.response != null ? item.response : ""}
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
                    <button onClick={() => this.setState({questionN: this.state.questions[number].next})} type="button" className="btn btn-success " style={{width: "100%",backgroundColor:"#00ba4c"}}> PAGE SUIVANTE</button>

                    </div>

                    </div>

                    </div>
                }









            </div>
        );
    }
}

export default Questions;
