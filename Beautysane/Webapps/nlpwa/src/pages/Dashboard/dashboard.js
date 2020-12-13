import React, {Component} from 'react';
import Topbar from "../../components/TopbarRecettes";
import Loader from "../../components/Loader";
import "./dashboard.css"
import {Button, FormControl, IconButton,Checkbox} from "@material-ui/core";
import {Tabs,TabList,Tab,TabPanel} from "react-tabs";
import MuiBackdrop from '../../components/Loading/MuiBackdrop';

import 'react-tabs/style/react-tabs.css';
import  mechanic from "../../assets/images/icons/mechanic.svg"
import  boost from "../../assets/images/icons/boost.svg"
import  logout from "../../assets/images/icons/logout.svg"
import  bodyHomme from "../../assets/images/bodyHomme.png"
import  bascule from "../../assets/images/bascule.png"

import  back from "../../assets/images/icons/previous.svg"
import  edit from "../../assets/images/icons/edit.svg"

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import { Line } from 'react-chartjs-2';
import QuestionService from "../../provider/webserviceQuestions"
import NlTopbar from "../../components/NlTopbar";



class Dashboard extends Component {
    constructor(props){
        super(props);

        this.state={
            page:"",
            borderVue:"#2eba5f",
            selectedItem:"vue",
            userData:'',
            user:'',
            loading:true
        }


    }

    componentDidMount() {
        let page = this.props.match.params.id
        this.setState({page:page})
        let user = localStorage.getItem('user')
        console.log(JSON.parse(user))
        this.setState({user:JSON.parse(user)})
        QuestionService.getuserDatabyEmail(localStorage.getItem('email').toString()).then((res)=>{
            this.setState({
                userData:res.data,
                loading:false
            })
        }).then(()=>{
            console.log(this.state.userData)
        })
    }

    render() {
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Evolution de mes mensurations ',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40]
                }
            ]
        };

        let page = this.props.match.params.id
        return (
            <div className="mb-5">
                <div className="header">
                    <NlTopbar page="mybs"></NlTopbar>

                </div>

                <MuiBackdrop open={this.state.loading} />

                { this.state.loading===false&&
                    <div className="wrapper">
                        <div className="container ">
                            <ul className="ul">
                                <li style={{
                                    borderBottomColor: this.state.selectedItem === "vue" ? "#2eba5f" : "white",
                                    borderBottomWidth: 1.5,
                                    borderBottomStyle: "solid"
                                }} onClick={() => {
                                    this.props.history.replace("/dashboard/vue")
                                    this.setState({selectedItem: "vue"})
                                }}>
                                    <text>VUE D'ENSEMBLE</text>
                                </li>
                                <li>
                                    <text>MES ADRESSE</text>
                                </li>
                                <li>
                                    <text>MES COMMANDES</text>
                                </li>
                                <li>
                                    <text>MES COUPONS</text>
                                </li>
                                <li>
                                    <img src={mechanic} style={{width: 20}}/>
                                </li>
                                <li className="row align-items-center" style={{
                                    borderBottomColor: this.state.selectedItem === "BS" ? "#2eba5f" : "white",
                                    borderBottomWidth: 1.5,
                                    borderBottomStyle: "solid"
                                }} onClick={() => {
                                    this.props.history.replace("/dashboard/BS")
                                    this.setState({selectedItem: "BS"})
                                }}>

                                    <img src={boost} style={{width: 20}}/>

                                    <text className="ml-1">MY BS</text>
                                </li>
                                <li onClick={() => this.props.history.push("/login")}
                                    className="row align-items-center">
                                    <img src={logout} style={{width: 20}}/>

                                    <text className="ml-1">SE DECONNECTER</text>
                                </li>

                            </ul>

                            {page === "vue" &&
                            <div>
                                <div className="mt-5">

                                    <div className="text-left">
                                        <h1 style={{color: "#00ba4c", fontFamily: "Blippo, fantasy "}}>VOS INFOS</h1>
                                    </div>
                                    <div className="row align-items-center">
                                        <div className="col-md-6 text-left">
                                            <div className="mt-2">
                                                <text style={{fontSize: "1.4vw", fontFamily: "Comic Sans MS"}}>
                                                    NOM
                                                </text>
                                            </div>
                                            <div className="mt-2">
                                                <text>{this.state.user.fullname}</text>
                                            </div>

                                        </div>
                                        <div className="col-md-6">
                                            <div className="mt-2">
                                                <text style={{fontSize: "1.4vw", fontFamily: "cursive"}}>
                                                    Email
                                                </text>
                                            </div>
                                            <div className="mt-2">
                                                <text>{this.state.user.email}</text>
                                            </div>


                                        </div>

                                    </div>
                                </div>

                                <div className="mt-3">

                                    <div className="text-left">
                                        <h1 style={{color: "#00ba4c", fontFamily: "Blippo, fantasy "}}>VOS ADRESSES</h1>
                                    </div>
                                    <div className="row align-items-center">
                                        <div className="col-md-6 text-left">
                                            <div className="mt-2">
                                                <text style={{fontSize: "1.4vw", fontFamily: "cursive"}}>
                                                    ADRESSE DE LIVRAISON
                                                </text>
                                            </div>

                                            <div className="mt-2" style={{
                                                width: "100%",
                                                borderRadius: 5,
                                                borderStyle: "solid",
                                                borderWidth: 0.5,
                                                padding: 10
                                            }}>
                                                <text className="font-weight-bold">Olla OLLÉ</text>
                                                <div>
                                                    <text>rue de fraise</text>
                                                </div>
                                                <div>
                                                    <text>57000 metz</text>
                                                </div>
                                                <div>
                                                    <text>France</text>
                                                </div>

                                                <div className="text-right">
                                                    <Button variant="contained" style={{
                                                        backgroundColor: "#00ba4c",
                                                        borderRadius: 15,
                                                        color: "white"
                                                    }}>
                                                        Modifier
                                                    </Button>
                                                </div>
                                            </div>


                                        </div>
                                        <div className="col-md-6 text-left">
                                            <div className="mt-2">
                                                <text style={{fontSize: "1.4vw", fontFamily: "cursive"}}>
                                                    ADRESSE DE FACTURATION
                                                </text>
                                            </div>

                                            <div className="mt-2" style={{
                                                width: "100%",
                                                borderRadius: 5,
                                                borderStyle: "solid",
                                                borderWidth: 0.5,
                                                padding: 10
                                            }}>
                                                <text className="font-weight-bold">Olla OLLÉ</text>
                                                <div>
                                                    <text>rue de fraise</text>
                                                </div>
                                                <div>
                                                    <text>57000 metz</text>
                                                </div>
                                                <div>
                                                    <text>France</text>
                                                </div>

                                                <div className="text-right">
                                                    <Button variant="contained" style={{
                                                        backgroundColor: "#00ba4c",
                                                        borderRadius: 15,
                                                        color: "white"
                                                    }}>
                                                        Modifier
                                                    </Button>
                                                </div>
                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>
                            }
                            {page === "BS" &&
                            <div>
                                <Tabs className="text-center">
                                    <TabList>
                                        <Tab>
                                            Ma fiche perso
                                        </Tab>
                                        <Tab>
                                            Moi et la Cuisine
                                        </Tab>
                                        <Tab>
                                            Activité physique
                                        </Tab>
                                        <Tab>
                                            Habitudes
                                        </Tab>
                                        <Tab>
                                            Objectifs
                                        </Tab>
                                        <Tab>
                                            Analyse de Sang
                                        </Tab>
                                        <Tab>
                                            Pb santé
                                        </Tab>

                                    </TabList>
                                    <TabPanel>
                                        <div className="row align-items-start">
                                            <div className="col-md-5">
                                                <div className="text-left mt-5">
                                                    <div className="row justify-content-start">
                                                        <div className="col-md-6">
                                                            <h4 className="font-weight-bold">{this.state.user.fullname}</h4>

                                                        </div>
                                                        <div className="col-md-2">
                                                            <text>{(parseFloat(this.state.userData.objectif.taille)/100).toFixed(2)} m</text>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="text-left mt-3">
                                                    <div className="row justify-content-start">
                                                        <div className="col-md-6">
                                                            <h4 className="font-weight-bold">Née le 29-04-1995</h4>

                                                        </div>
                                                        <div className="col-md-2">
                                                            <text>{this.state.userData.objectif.poids} Kg</text>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="text-left mt-3">
                                                    <div className="row justify-content-start align-items-center">
                                                        <div className="col-md-6">
                                                            <h4 className="font-weight-bold">Mon age </h4>

                                                        </div>
                                                        <div className="col-md-2 " style={{backgroundColor: "#2eba5f"}}>
                                                            <text style={{color: "white"}}>{this.state.userData.objectif.age} ans</text>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-7">
                                                <Tabs>
                                                    <TabList>
                                                        <Tab>
                                                            Mes Mensuration
                                                        </Tab>
                                                        <Tab>
                                                            Mes Mensuration
                                                        </Tab>
                                                        <Tab>
                                                            Mes Mensuration
                                                        </Tab>
                                                        <Tab>
                                                            Mes Mensuration
                                                        </Tab>

                                                    </TabList>
                                                    <TabPanel>
                                                        <div className="row ">

                                                            <div className="col-md-6 ">
                                                                <img src={bodyHomme} style={{width: "100%"}}/>

                                                            </div>
                                                            <div className="col-md-6 p-1" style={{
                                                                borderColor: "black",
                                                                borderStyle: "solid",
                                                                borderRadius: 8,
                                                                borderWidth: 0.8
                                                            }}>
                                                                <div className="row align-items-center">
                                                                    <div className="col-md-2">
                                                                        <IconButton>
                                                                            <img src={back} style={{width: 25}}/>

                                                                        </IconButton>
                                                                    </div>
                                                                    <div className="col-md-5">
                                                                        <Button variant="contained" color="primary">
                                                                            Janvier 2020
                                                                        </Button>

                                                                    </div>
                                                                    <div className="col-md-5">
                                                                        <Button variant="contained" color="primary">
                                                                            Juin 2020
                                                                        </Button>

                                                                    </div>
                                                                </div>

                                                                <div style={{marginTop: "20%"}}>

                                                                    <div className="row ">
                                                                        <div className="col-md-6">
                                                                            <FormControl fullWidth variant="outlined">
                                                                                <InputLabel
                                                                                    htmlFor="outlined-adornment-amount">Taille
                                                                                    vendre</InputLabel>
                                                                                <OutlinedInput
                                                                                    id="outlined-adornment-amount"
                                                                                    value=""
                                                                                    endAdornment={<InputAdornment
                                                                                        position="end">Cm</InputAdornment>}
                                                                                    labelWidth={60}
                                                                                />
                                                                            </FormControl>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <FormControl fullWidth variant="outlined">
                                                                                <InputLabel
                                                                                    htmlFor="outlined-adornment-amount">Taille
                                                                                    vendre</InputLabel>
                                                                                <OutlinedInput
                                                                                    id="outlined-adornment-amount"
                                                                                    value=""
                                                                                    endAdornment={<InputAdornment
                                                                                        position="end">Cm</InputAdornment>}
                                                                                    labelWidth={60}
                                                                                />
                                                                            </FormControl>

                                                                        </div>
                                                                    </div>
                                                                    <div className="row mt-2">
                                                                        <div className="col-md-6">
                                                                            <FormControl fullWidth variant="outlined">
                                                                                <InputLabel
                                                                                    htmlFor="outlined-adornment-amount">Hanche</InputLabel>
                                                                                <OutlinedInput
                                                                                    id="outlined-adornment-amount"
                                                                                    value=""
                                                                                    endAdornment={<InputAdornment
                                                                                        position="end">Cm</InputAdornment>}
                                                                                    labelWidth={60}
                                                                                />
                                                                            </FormControl>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <FormControl fullWidth variant="outlined">
                                                                                <InputLabel
                                                                                    htmlFor="outlined-adornment-amount">Hanche</InputLabel>
                                                                                <OutlinedInput
                                                                                    id="outlined-adornment-amount"
                                                                                    value=""
                                                                                    endAdornment={<InputAdornment
                                                                                        position="end">Cm</InputAdornment>}
                                                                                    labelWidth={60}
                                                                                />
                                                                            </FormControl>

                                                                        </div>
                                                                    </div>
                                                                    <div className="row mt-2">
                                                                        <div className="col-md-6">
                                                                            <FormControl fullWidth variant="outlined">
                                                                                <InputLabel
                                                                                    htmlFor="outlined-adornment-amount">Cuisse
                                                                                    droite</InputLabel>
                                                                                <OutlinedInput
                                                                                    id="outlined-adornment-amount"
                                                                                    value=""
                                                                                    endAdornment={<InputAdornment
                                                                                        position="end">Cm</InputAdornment>}
                                                                                    labelWidth={60}
                                                                                />
                                                                            </FormControl>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <FormControl fullWidth variant="outlined">
                                                                                <InputLabel
                                                                                    htmlFor="outlined-adornment-amount">Cuisse
                                                                                    droite</InputLabel>
                                                                                <OutlinedInput
                                                                                    id="outlined-adornment-amount"
                                                                                    value=""
                                                                                    endAdornment={<InputAdornment
                                                                                        position="end">Cm</InputAdornment>}
                                                                                    labelWidth={60}
                                                                                />
                                                                            </FormControl>

                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>


                                                        </div>

                                                        <div className="mt-2">
                                                            <h4>
                                                                Evolution de mes mensurations

                                                            </h4>

                                                        </div>

                                                        <div>
                                                            <Line data={data}
                                                            />
                                                        </div>
                                                    </TabPanel>
                                                    <TabPanel>
                                                        <div className="row ">

                                                            <div className="col-md-6  text-center">
                                                                <img src={bascule} style={{width: "50%"}}/>


                                                            </div>
                                                            <div className="col-md-6 p-1" style={{
                                                                borderColor: "black",
                                                                borderStyle: "solid",
                                                                borderRadius: 8,
                                                                borderWidth: 0.8
                                                            }}>
                                                                <div className="row align-items-center">
                                                                    <div className="col-md-2">
                                                                        <IconButton>
                                                                            <img src={back} style={{width: 25}}/>

                                                                        </IconButton>
                                                                    </div>
                                                                    <div className="col-md-5">
                                                                        <Button variant="contained" color="primary">
                                                                            Janvier 2020
                                                                        </Button>

                                                                    </div>
                                                                    <div className="col-md-5">
                                                                        <Button variant="contained" color="primary">
                                                                            Juin 2020
                                                                        </Button>

                                                                    </div>
                                                                </div>

                                                                <div style={{marginTop: "20%"}}>


                                                                    <div className="row mt-2">
                                                                        <div className="col-md-6">
                                                                            <FormControl fullWidth variant="outlined">
                                                                                <InputLabel
                                                                                    htmlFor="outlined-adornment-amount">Poids</InputLabel>
                                                                                <OutlinedInput
                                                                                    id="outlined-adornment-amount"
                                                                                    value=""
                                                                                    endAdornment={<InputAdornment
                                                                                        position="end">Kg</InputAdornment>}
                                                                                    labelWidth={60}
                                                                                />
                                                                            </FormControl>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <FormControl fullWidth variant="outlined">
                                                                                <InputLabel
                                                                                    htmlFor="outlined-adornment-amount">Poids</InputLabel>
                                                                                <OutlinedInput
                                                                                    id="outlined-adornment-amount"
                                                                                    value=""
                                                                                    endAdornment={<InputAdornment
                                                                                        position="end">Kg</InputAdornment>}
                                                                                    labelWidth={60}
                                                                                />
                                                                            </FormControl>

                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>


                                                        </div>

                                                        <div className="mt-2">
                                                            <h4>
                                                                Evolution de mes mensurations

                                                            </h4>

                                                        </div>

                                                        <div>
                                                            <Line data={data}
                                                            />
                                                        </div>
                                                    </TabPanel>
                                                </Tabs>

                                            </div>
                                        </div>


                                    </TabPanel>
                                    <TabPanel>
                                        <div className="row align-items-start mt-3">
                                            <div className="col-md-6 text-left">
                                                <div>
                                                    <text style={{fontWeight: "bold", fontSize: "1.2vw"}}>
                                                        Généraliste
                                                    </text>
                                                </div>
                                                <div>
                                                    <div className="row justify-content-start mt-3">
                                                        <div className="col-md-4">
                                                            <text className="font-weight-bold">
                                                                Souhait sur Cuisine
                                                            </text>
                                                        </div>
                                                        <div className="col-md-4" style={{backgroundColor: "#2eba5f"}}>
                                                            <text style={{color: "white"}}>
                                                                {this.state.userData.question.alimentation1}
                                                            </text>

                                                        </div>
                                                        <div className="col-md-1">
                                                            <img src={edit} style={{width: "100%"}}/>
                                                        </div>

                                                    </div>
                                                    <div className="row justify-content-start mt-3">
                                                        <div className="col-md-4">
                                                            <text className="font-weight-bold">
                                                                Mon alimentation est
                                                            </text>
                                                        </div>
                                                        <div className="col-md-4" style={{backgroundColor: "#2eba5f"}}>
                                                            <text style={{color: "white"}}>
                                                                {this.state.userData.question.alimentation2}
                                                            </text>

                                                        </div>
                                                        <div className="col-md-1">
                                                            <img src={edit} style={{width: "100%"}}/>
                                                        </div>

                                                    </div>
                                                    <div className="row justify-content-start mt-3">
                                                        <div className="col-md-4">
                                                            <text className="font-weight-bold">
                                                                Mon budget alimentaire
                                                            </text>
                                                        </div>
                                                        <div className="col-md-4" style={{backgroundColor: "#2eba5f"}}>
                                                            <text style={{color: "white"}}>
                                                                {this.state.userData.question.budget_alimen}

                                                            </text>

                                                        </div>
                                                        <div className="col-md-1">
                                                            <img src={edit} style={{width: "100%"}}/>
                                                        </div>

                                                    </div>
                                                    <div className="row justify-content-start mt-3">
                                                        <div className="col-md-4">
                                                            <text className="font-weight-bold">
                                                                Est ce que vous grignotez :
                                                            </text>
                                                        </div>
                                                        <div className="col-md-4" style={{backgroundColor: "#2eba5f"}}>
                                                            <text style={{color: "white"}}>
                                                                {this.state.userData.question.vous_grignotez}
                                                            </text>


                                                        </div>
                                                        <div className="col-md-1">
                                                            <img src={edit} style={{width: "100%"}}/>
                                                        </div>

                                                    </div>
                                                    <div className="row justify-content-start mt-3">
                                                        <div className="col-md-4">
                                                            <text className="font-weight-bold">
                                                                Vous sautez des repas ?
                                                            </text>
                                                        </div>
                                                        <div className="col-md-4" style={{backgroundColor: "#2eba5f"}}>
                                                            <text style={{color: "white"}}>
                                                                {this.state.userData.question.saute_repas}
                                                            </text>

                                                        </div>
                                                        <div className="col-md-1">
                                                            <img src={edit} style={{width: "100%"}}/>
                                                        </div>

                                                    </div>
                                                    <div className="row justify-content-start mt-3">
                                                        <div className="col-md-4">
                                                            <text className="font-weight-bold">
                                                                Lequel ?
                                                            </text>
                                                        </div>
                                                        <div className="col-md-4" style={{backgroundColor: "#2eba5f"}}>
                                                            <text style={{color: "white"}}>
                                                                {this.state.userData.question.oui_lequel}
                                                            </text>

                                                        </div>
                                                        <div className="col-md-1">
                                                            <img src={edit} style={{width: "100%"}}/>
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>
                                            <div className="col-md-6">
                                                <div className="text-left">
                                                    <text style={{fontWeight: "bold", fontSize: "1.2vw"}}>
                                                        Habitudes alimentaires actuelles
                                                    </text>
                                                </div>
                                                <div>
                                                    <div className="row justify-content-start mt-3">
                                                        <div className="col-md-5 text-left">
                                                            <text className="font-weight-bold">
                                                                Les Féculents pour moi, c’est :
                                                            </text>
                                                        </div>
                                                        <div className="col-md-4" style={{backgroundColor: "#2eba5f"}}>
                                                            <text style={{color: "white"}}>
                                                                {this.state.userData.question.consom_feculent}
                                                            </text>

                                                        </div>
                                                        <div className="col-md-1">
                                                            <img src={edit} style={{width: "100%"}}/>
                                                        </div>

                                                    </div>
                                                    <div className="row justify-content-start mt-3">
                                                        <div className="col-md-5 text-left">
                                                            <text className="font-weight-bold">
                                                                Les fruits , c’est :
                                                            </text>
                                                        </div>
                                                        <div className="col-md-4" style={{backgroundColor: "#2eba5f"}}>
                                                            <text style={{color: "white"}}>
                                                                {this.state.userData.question.consom_fruit}
                                                            </text>

                                                        </div>
                                                        <div className="col-md-1">
                                                            <img src={edit} style={{width: "100%"}}/>
                                                        </div>

                                                    </div>
                                                    <div className="row justify-content-start mt-3">
                                                        <div className="col-md-5 text-left">
                                                            <text className="font-weight-bold">
                                                                La viande, poisson, c’est
                                                            </text>
                                                        </div>
                                                        <div className="col-md-4" style={{backgroundColor: "#2eba5f"}}>
                                                            <text style={{color: "white"}}>
                                                                {this.state.userData.question.consom_viande}                                                            </text>

                                                        </div>
                                                        <div className="col-md-1">
                                                            <img src={edit} style={{width: "100%"}}/>
                                                        </div>

                                                    </div>
                                                    <div className="row justify-content-start mt-3">
                                                        <div className="col-md-5 text-left">
                                                            <text className="font-weight-bold">
                                                                Les produits laitiers, c’est
                                                            </text>
                                                        </div>
                                                        <div className="col-md-4" style={{backgroundColor: "#2eba5f"}}>
                                                            <text style={{color: "white"}}>
                                                                {this.state.userData.question.consom_laitiers}
                                                            </text>

                                                        </div>
                                                        <div className="col-md-1">
                                                            <img src={edit} style={{width: "100%"}}/>
                                                        </div>

                                                    </div>
                                                    <div className="row justify-content-start mt-3">
                                                        <div className="col-md-5 text-left">
                                                            <text className="font-weight-bold">
                                                                La consommation produit gras
                                                            </text>
                                                        </div>
                                                        <div className="col-md-4" style={{backgroundColor: "#2eba5f"}}>
                                                            <text style={{color: "white"}}>
                                                                {this.state.userData.question.consom_prod_gras}
                                                            </text>

                                                        </div>
                                                        <div className="col-md-1">
                                                            <img src={edit} style={{width: "100%"}}/>
                                                        </div>

                                                    </div>
                                                    <div className="row justify-content-start mt-3">
                                                        <div className="col-md-5 text-left">
                                                            <text className="font-weight-bold">
                                                                Les produits sucrés c’est
                                                            </text>
                                                        </div>
                                                        <div className="col-md-4" style={{backgroundColor: "#2eba5f"}}>
                                                            <text style={{color: "white"}}>
                                                                {this.state.userData.question.consom_prod_sucre}
                                                            </text>

                                                        </div>
                                                        <div className="col-md-1">
                                                            <img src={edit} style={{width: "100%"}}/>
                                                        </div>

                                                    </div>
                                                    <div className="row justify-content-start mt-3">
                                                        <div className="col-md-5 text-left">
                                                            <text className="font-weight-bold">
                                                                La consommation d’alcool c’est:
                                                            </text>
                                                        </div>
                                                        <div className="col-md-4" style={{backgroundColor: "#2eba5f"}}>
                                                            <text style={{color: "white"}}>
                                                                {this.state.userData.question.consom_alcool}
                                                            </text>

                                                        </div>
                                                        <div className="col-md-1">
                                                            <img src={edit} style={{width: "100%"}}/>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="col-md-12 text-left mt-5">
                                            <div>
                                                <text className="font-weight-bold" style={{fontSize: "1.2vw"}}>
                                                    Habitudes spprtives
                                                </text>

                                            </div>
                                            <div className="row align-items-center mt-3 justify-content-start">
                                                <div className="col-md-4 ">
                                                    <text>
                                                        Par jour, vous faite 30 min d'activités
                                                    </text>

                                                </div>
                                                <div className="col-md-4 text-center "
                                                     style={{backgroundColor: "#2eba5f"}}>
                                                    <text style={{color: "white"}}>
                                                        {this.state.userData.question.activite_jour}
                                                    </text>

                                                </div>
                                                <div className="col-md-1">
                                                    <img src={edit} style={{width: 20}}/>
                                                </div>
                                            </div>
                                            <div className="row align-items-center mt-3 justify-content-start">
                                                <div className="col-md-4">
                                                    <text>
                                                        Par semaine, l’activité sportive c’est :
                                                    </text>

                                                </div>
                                                <div className="col-md-4 text-center"
                                                     style={{backgroundColor: "#2eba5f"}}>
                                                    <text style={{color: "white"}}>
                                                        {this.state.userData.question.heure_sport}
                                                    </text>

                                                </div>
                                                <div className="col-md-1">
                                                    <img src={edit} style={{width: 20}}/>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="row align-items-center mt-3">
                                            <div className="col-md-2 text-left">
                                                <text>
                                                    Travail en heure décalée
                                                </text>

                                            </div>
                                            <div className="col-md-2 text-center" style={{backgroundColor: "#2eba5f"}}>
                                                <text style={{color: "white"}}>
                                                    {this.state.userData.question.travaill_horraire_decale}
                                                </text>

                                            </div>
                                            <div className="col-md-1 ">
                                                <img src={edit} style={{width: 20}}/>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mt-3">
                                            <div className="col-md-2 text-left">
                                                <text>
                                                    Mon principale problème :
                                                </text>

                                            </div>
                                            <div className="col-md-2 text-center" style={{backgroundColor: "#2eba5f"}}>
                                                <text style={{color: "white"}}>
                                                    {this.state.userData.question.probleme_de}
                                                </text>

                                            </div>
                                            <div className="col-md-1 ">
                                                <img src={edit} style={{width: 20}}/>
                                            </div>
                                        </div>
                                        { /* <div className="row align-items-start mt-3">
                                            <div className="col-md-2 text-left">
                                                <div>
                                                    <text>
                                                        Mes autre problémes
                                                    </text>
                                                </div>
                                                <div>
                                                    <small>
                                                        ( en ordre décroissant )
                                                    </small>
                                                </div>

                                            </div>
                                            <div className="col-md-3 text-center">
                                                <div className="row justify-content-start">
                                                    <div className="col-md-9" style={{
                                                        padding: 10,
                                                        borderStyle: "solid",
                                                        borderColor: "#2eba5f",
                                                        borderWidth: 0.5,
                                                        borderRadius: 10
                                                    }}>
                                                        <text style={{color: "#2eba5f"}}>
                                                            Sommeil Fatigue
                                                        </text>


                                                    </div>
                                                    <div className="col-md-1 ">
                                                        <img src={edit} style={{width: 20}}/>
                                                    </div>
                                                </div>
                                                <div className="row justify-content-start align-items-center mt-2">
                                                    <div className="col-md-9" style={{
                                                        width: "100%",
                                                        padding: 10,
                                                        borderStyle: "solid",
                                                        borderColor: "#2eba5f",
                                                        borderWidth: 0.5,
                                                        borderRadius: 10
                                                    }}>
                                                        <text style={{color: "#2eba5f"}}>
                                                            Digestion Transit
                                                        </text>

                                                    </div>
                                                    <div className="col-md-1 ">
                                                        <img src={edit} style={{width: 20}}/>
                                                    </div>
                                                </div>
                                                <div className="row justify-content-start align-items-center mt-2">
                                                    <div className="col-md-9" style={{
                                                        width: "100%",
                                                        padding: 10,
                                                        borderStyle: "solid",
                                                        borderColor: "#2eba5f",
                                                        borderWidth: 0.5,
                                                        borderRadius: 10
                                                    }}>
                                                        <text style={{color: "#2eba5f"}}>
                                                            Rien de tous cela
                                                        </text>

                                                    </div>
                                                    <div className="col-md-1 ">
                                                        <img src={edit} style={{width: 20}}/>
                                                    </div>
                                                </div>
                                                <div className="row justify-content-start align-items-center mt-2">
                                                    <div className="col-md-9" style={{
                                                        width: "100%",
                                                        padding: 10,
                                                        borderStyle: "solid",
                                                        borderColor: "#2eba5f",
                                                        borderWidth: 0.5,
                                                        borderRadius: 10
                                                    }}>
                                                        <text style={{color: "#2eba5f"}}>
                                                            Articulation
                                                        </text>

                                                    </div>
                                                    <div className="col-md-1 ">
                                                        <img src={edit} style={{width: 20}}/>
                                                    </div>
                                                </div>
                                                <div className="row justify-content-start align-items-center mt-2">
                                                    <div className="col-md-9" style={{
                                                        width: "100%",
                                                        padding: 10,
                                                        borderStyle: "solid",
                                                        borderColor: "#2eba5f",
                                                        borderWidth: 0.5,
                                                        borderRadius: 10
                                                    }}>
                                                        <text style={{color: "#2eba5f"}}>
                                                            Infections répétées
                                                        </text>

                                                    </div>
                                                    <div className="col-md-1 ">
                                                        <img src={edit} style={{width: 20}}/>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>*/}
                                        <div className="row align-items-center mt-3">
                                            <div className="col-md-2 text-left">
                                                <text>
                                                    Est ce que je fumes ?
                                                </text>

                                            </div>
                                            <div className="col-md-2 text-center" style={{backgroundColor: "#2eba5f"}}>
                                                <text style={{color: "white"}}>
                                                    {this.state.userData.objectif.fumer_reg}
                                                </text>

                                            </div>
                                            <div className="col-md-1 ">
                                                <img src={edit} style={{width: 20}}/>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="row align-items-center mt-5">
                                            <div className="col-md-3 text-left">
                                                <text>
                                                    Mon objectif principale
                                                </text>

                                            </div>
                                            <div className="col-md-2 text-center p-1"
                                                 style={{backgroundColor: "#2eba5f"}}>
                                                <text style={{color: "white"}}>
                                                    {this.state.userData.question.objectif}
                                                </text>

                                            </div>
                                            <div className="col-md-1 ">
                                                <img src={edit} style={{width: 20}}/>
                                            </div>

                                        </div>
                                        <div className="row align-items-center mt-5">
                                            <div className="col-md-3 text-left">
                                                <text>
                                                    Ma principale motivation
                                                </text>

                                            </div>
                                            <div className="col-md-3 text-center p-1"
                                                 style={{backgroundColor: "#2eba5f"}}>
                                                <text style={{color: "white"}}>
                                                    {this.state.userData.objectif.motivation}

                                                </text>

                                            </div>
                                            <div className="col-md-1 ">
                                                <img src={edit} style={{width: 20}}/>
                                            </div>

                                        </div>
                                        { /*     <div className="row align-items-start mt-3">
                                            <div className="col-md-3 text-left">
                                                <div>
                                                    <text>
                                                        Mes autres motivations :
                                                    </text>
                                                </div>
                                                <div>
                                                    <small>
                                                        ( en ordre décroissant )
                                                    </small>
                                                </div>

                                            </div>
                                            <div className="col-md-3 text-center">
                                                <div className="row justify-content-start align-items-center">
                                                    <div className="col-md-10" style={{
                                                        padding: 10,
                                                        borderStyle: "solid",
                                                        borderColor: "#2eba5f",
                                                        borderWidth: 0.5,
                                                        borderRadius: 10
                                                    }}>
                                                        <text style={{color: "#2eba5f"}}>
                                                            Retrouver un confort digestif
                                                        </text>

                                                    </div>
                                                    <div className="col-md-1 ">
                                                        <img src={edit} style={{width: 20}}/>
                                                    </div>
                                                </div>
                                                <div className="row justify-content-start align-items-center mt-2">
                                                    <div className="col-md-10" style={{
                                                        padding: 10,
                                                        borderStyle: "solid",
                                                        borderColor: "#2eba5f",
                                                        borderWidth: 0.5,
                                                        borderRadius: 10
                                                    }}>
                                                        <text style={{color: "#2eba5f"}}>
                                                            Retrouver du tonus de l'énergie
                                                        </text>

                                                    </div>
                                                    <div className="col-md-1 ">
                                                        <img src={edit} style={{width: 20}}/>
                                                    </div>
                                                </div>
                                                <div className="row justify-content-start align-items-center mt-2">
                                                    <div className="col-md-10" style={{
                                                        padding: 10,
                                                        borderStyle: "solid",
                                                        borderColor: "#2eba5f",
                                                        borderWidth: 0.5,
                                                        borderRadius: 10
                                                    }}>
                                                        <text style={{color: "#2eba5f"}}>
                                                            Mieux dormir
                                                        </text>

                                                    </div>
                                                    <div className="col-md-1 ">
                                                        <img src={edit} style={{width: 20}}/>
                                                    </div>
                                                </div>
                                                <div className="row justify-content-start align-items-center mt-2">
                                                    <div className="col-md-10" style={{
                                                        padding: 10,
                                                        borderStyle: "solid",
                                                        borderColor: "#2eba5f",
                                                        borderWidth: 0.5,
                                                        borderRadius: 10
                                                    }}>
                                                        <text style={{color: "#2eba5f"}}>
                                                            Manger équilibrer en évitant les carences
                                                        </text>

                                                    </div>
                                                    <div className="col-md-1 ">
                                                        <img src={edit} style={{width: 20}}/>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>*/}
                                    </TabPanel>
                                    <TabPanel>
                                        <table className="table table-bordered text-center">
                                            <thead style={{backgroundColor: "#1979a9"}}>
                                            <tr>
                                                <th scope="col">
                                                    <text style={{color: "white"}}>Libellé analyse</text>
                                                </th>
                                                <th scope="col">
                                                    <text style={{color: "white"}}>Résultat</text>
                                                </th>
                                                <th scope="col">
                                                    <text style={{color: "white"}}>Unité</text>
                                                </th>
                                                <th scope="col">
                                                    <text style={{color: "white"}}>Référence</text>
                                                </th>
                                                <th scope="col">
                                                    <text style={{color: "white"}}>Graphiques</text>
                                                </th>
                                                <th scope="col" width={"10%"}>
                                                    <text style={{color: "white"}}>Historique</text>
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody className="text-center">
                                            <tr>
                                                <th scope="row">HEMATIES</th>
                                                <td>4220000</td>
                                                <td style={{textTransform: "none"}}>/mm3</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>
                                                            4100000
                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>
                                                            5400000
                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Hemoglobine</th>
                                                <td>11.5</td>
                                                <td style={{textTransform: "none"}}>g/dl</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>
                                                            11.7
                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>
                                                            16.2
                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Hematocrite</th>
                                                <td>34.6</td>
                                                <td style={{textTransform: "none"}}>%</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>
                                                            36
                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>
                                                            46
                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">V.G.M</th>
                                                <td>82</td>
                                                <td style={{textTransform: "none"}}>fl</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>
                                                            81
                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>
                                                            99
                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">T.C.M.H</th>
                                                <td>27.2</td>
                                                <td style={{textTransform: "none"}}>pg</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>
                                                            28
                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>
                                                            33
                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">C.C.M.H</th>
                                                <td>33.2</td>
                                                <td style={{textTransform: "none"}}>g/dl</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>
                                                            32
                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>
                                                            37
                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">LEUCOCYTES</th>
                                                <td>6600</td>
                                                <td style={{textTransform: "none"}}>/mm3</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>
                                                            4000
                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>
                                                            10100
                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Poly. neutrophiles</th>
                                                <td>5062</td>
                                                <td style={{textTransform: "none"}}>/mm3</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>
                                                            1700
                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>
                                                            6300
                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">pn03</th>
                                                <td>76.7</td>
                                                <td style={{textTransform: "none"}}>%</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>

                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>

                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Poly. eosinophiles</th>
                                                <td>185</td>
                                                <td style={{textTransform: "none"}}>/mm3</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>
                                                            100
                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>
                                                            400
                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">pe03</th>
                                                <td>2.8</td>
                                                <td style={{textTransform: "none"}}>%</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>

                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>

                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Poly. basophiles</th>
                                                <td>86</td>
                                                <td style={{textTransform: "none"}}>/mm3</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>
                                                            10

                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>
                                                            110

                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">pb03</th>
                                                <td>1.3</td>
                                                <td style={{textTransform: "none"}}>%</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>

                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>

                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Lymphocytes</th>
                                                <td>1096</td>
                                                <td style={{textTransform: "none"}}>/mm3</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>
                                                            1000

                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>
                                                            3300
                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">ly03</th>
                                                <td>16.6</td>
                                                <td style={{textTransform: "none"}}>%</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>


                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>

                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Monocytes</th>
                                                <td>172</td>
                                                <td style={{textTransform: "none"}}>/mm3</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>
                                                            100
                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>
                                                            600
                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">mono03</th>
                                                <td>2.6</td>
                                                <td style={{textTransform: "none"}}>%</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>

                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>

                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">NUMERATION DES PLAQUETTES</th>
                                                <td>287000</td>
                                                <td style={{textTransform: "none"}}>/mm3</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>
                                                            150000
                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>
                                                            400000

                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">CREATININE</th>
                                                <td>8.5</td>
                                                <td style={{textTransform: "none"}}>mg/l</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>
                                                            5.5
                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>
                                                            10.2

                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">- CKD EPI :</th>
                                                <td>69.64</td>
                                                <td style={{textTransform: "none"}}>ml/mn</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>

                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>


                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Cockroft et Gault</th>
                                                <td>90.1</td>
                                                <td style={{textTransform: "none"}}>ml/mn</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>

                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>


                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Poids</th>
                                                <td>93</td>
                                                <td style={{textTransform: "none"}}>kg</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>

                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>


                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">PROTEINE C-REACTIVE (CRP)</th>
                                                <td>35.2</td>
                                                <td style={{textTransform: "none"}}>mg/L</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>
                                                            0
                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>
                                                            5
                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">SODIUM</th>
                                                <td>138</td>
                                                <td style={{textTransform: "none"}}>mmol/L</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>
                                                            136
                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>
                                                            146
                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">POTASSIUM</th>
                                                <td>4.5</td>
                                                <td style={{textTransform: "none"}}>mmol/L</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>
                                                            3.4
                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>
                                                            4.5
                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">CHLORE</th>
                                                <td>104</td>
                                                <td style={{textTransform: "none"}}>mmol/L</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>
                                                            101
                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>
                                                            109
                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">CALCIUM CORRIGE</th>
                                                <td>93</td>
                                                <td style={{textTransform: "none"}}>mg/l</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>

                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>

                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">CALCIUM</th>
                                                <td>91</td>
                                                <td style={{textTransform: "none"}}>mg/l</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>
                                                            88
                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>
                                                            106
                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">PHOSPHOREMIE</th>
                                                <td>36</td>
                                                <td style={{textTransform: "none"}}>mg/L</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>
                                                            26
                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>
                                                            45
                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">MAGNESIUM PLASMATIQUE</th>
                                                <td>21</td>
                                                <td style={{textTransform: "none"}}>mg/L</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>
                                                            19
                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>
                                                            25
                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">ALBUMINE SERIQUE</th>
                                                <td>38</td>
                                                <td style={{textTransform: "none"}}>g/l</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>
                                                            35
                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>
                                                            52
                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">BILIRUBINE TOTALE</th>
                                                <td>7</td>
                                                <td style={{textTransform: "none"}}>mg/L</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>
                                                            0
                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>
                                                            10
                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">BILIRUBINE CONJUGUEE</th>
                                                <td>1</td>
                                                <td style={{textTransform: "none"}}>mg/L</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>
                                                            0
                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>
                                                            2
                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">TRANSAMINASE TGO (ASAT)</th>
                                                <td>14</td>
                                                <td style={{textTransform: "none"}}>U/L</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>
                                                            10
                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>
                                                            35
                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">TRANSAMINASE TGP (ALAT)</th>
                                                <td>12</td>
                                                <td style={{textTransform: "none"}}>U/L</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>
                                                            10
                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>
                                                            35
                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">GAMMA-GLUTAMYL TRANSFERASE (GGT)</th>
                                                <td>33</td>
                                                <td style={{textTransform: "none"}}>U/L</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>
                                                            5
                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>
                                                            38
                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">PHOSPHATASES ALCALINES</th>
                                                <td>116</td>
                                                <td style={{textTransform: "none"}}>U/L</td>
                                                <td>
                                                    <tr>
                                                        <td width={"45%"}>
                                                            32
                                                        </td>
                                                        <td width={"10%"}>
                                                            -
                                                        </td>
                                                        <td width={"45%"}>
                                                            120
                                                        </td>
                                                    </tr>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Checkbox
                                                        defaultChecked
                                                        color="primary"
                                                        inputProps={{'aria-label': 'secondary checkbox'}}
                                                    />
                                                </td>
                                            </tr>


                                            </tbody>
                                        </table>
                                    </TabPanel>

                                </Tabs>

                            </div>
                            }


                        </div>

                    </div>
                }


            </div>
        );
    }
}

export default Dashboard;
