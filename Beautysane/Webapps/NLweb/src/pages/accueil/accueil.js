import React, {Component} from 'react';
import logo from "../../assets/images/logos/logo_white.svg"
import NlTopbar from "../../components/NlTopbar"
import bodycheckMinceur from "../../assets/images/BS/bodycheck-minceur.png"
import bodycheckSport from "../../assets/images/BS/bodycheck-sport.png"
import bodycheckEquilibre from "../../assets/images/BS/bodycheck-equilibre.png"

class Accueil extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div>
              <div className="header">
                  <NlTopbar page={"accueil"} history={this.props.history}/>


              </div>
                <div className="wrapper">
                    <div className="row justify-content-around">
                        <div onClick={()=>{this.props.history.push('/BilanMinceur')}} className="col-md-3" style={{cursor:"pointer",borderRadius:10,backgroundImage: `linear-gradient(to bottom,#fff5a7 0,#d5ca8a 100%)`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover',}}
                        >

                            <div className="p-4"  style={{position:"relative", height:"100%",backgroundImage:`url(${bodycheckMinceur})`,backgroundPositionX:"right",backgroundPositionY:"bottom",backgroundSize:"50%",backgroundRepeat:'no-repeat'}}>

                            <h1 c style={{fontWeight:"bold",fontFamily:"'Goudar HL',sans-serif"}}>
                                PERDRE DU POIDS AVEC PLAISIR
                            </h1>

                            <div className="mt-4 mb-5">
                                <text  style={{fontSize:"1.2rem",fontFamily:"Dosis,sans-serif;"}}>
                                    Programme efficace et flexible pour perdre du poids, sans carences, avec gourmandise et équilibre !
                                </text>
                            </div>
                                <div style={{position:"absolute",bottom:"2rem",width:"6rem"}}>
                                    <text style={{fontFamily:"Dosis,sans-serif",TextTransform:"uppercase"}}>
                                        Go Bodycheck Minceur !
                                    </text>


                                </div>
                            </div>





                        </div>
                        <div  onClick={()=>{this.props.history.push('/BilanSport')}}  className="col-md-3" style={{cursor:"pointer",borderRadius:10,backgroundImage: `linear-gradient(to bottom,#d8eefd 0,#95c0dc 100%)`,backgroundRepeat: 'no-repeat'}}
                        >

                            <div className="p-4"  style={{position:"relative", height:"100%",backgroundImage:`url(${bodycheckSport})`,backgroundPositionX:"right",backgroundPositionY:"bottom",backgroundSize:"50%",backgroundRepeat:'no-repeat'}}>

                                <h1 c style={{fontWeight:"bold",fontFamily:"'Goudar HL',sans-serif"}}>
                                    ACCROÎTRE VOS PERFORMANCES
                                </h1>

                                <div className="mt-4 mb-5">
                                    <text  style={{fontSize:"1.2rem",fontFamily:"Dosis,sans-serif;"}}>
                                        Sportif professionnel, amateur ou sportif du dimanche, relevez vos défis et augmentez vos performances sportives en un simple geste !                                    </text>
                                </div>
                                <div style={{position:"absolute",bottom:"2rem",width:"2rem"}} >
                                    <text style={{fontFamily:"Dosis,sans-serif",TextTransform:"uppercase",width:"6rem"}}>
                                        Go Bodycheck SPORT !
                                    </text>


                                </div>
                            </div>





                        </div>
                        <div  onClick={()=>{this.props.history.push('/BilanEquilibre')}}  className="col-md-3" style={{cursor:"pointer",borderRadius:10,backgroundImage: `linear-gradient(to bottom,#edd0e6 0,#d5b2cd 100%)`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover',}}
                        >

                            <div className="p-4"  style={{position:"relative", height:"60vh",backgroundImage:`url(${bodycheckEquilibre})`,backgroundPositionX:"right",backgroundPositionY:"bottom",backgroundSize:"50%",backgroundRepeat:'no-repeat'}}>

                                <h1 c style={{fontWeight:"bold",fontFamily:"'Goudar HL',sans-serif"}}>
                                    MANGER SAIN ET SANS PRISE DE TETE                                </h1>

                                <div className="mt-4 mb-5">
                                    <text  style={{fontSize:"1.2rem",fontFamily:"Dosis,sans-serif;"}}>
                                        Tous les apports nutritionnels dont votre corps a besoin en un seul repas, prêt en 2 minutes, au bureau, au grand air comme à la maison !                                    </text>
                                </div>
                                <div style={{position:"absolute",bottom:"2rem",width:"6rem"}}>
                                    <text style={{fontFamily:"Dosis,sans-serif",TextTransform:"uppercase"}}>
                                        GO BODYCHECK EQUILIBRE !
                                    </text>


                                </div>
                            </div>





                        </div>


                    </div>



                </div>

            </div>
        );
    }
}

export default Accueil;
