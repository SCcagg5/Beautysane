import React, {Component} from 'react';
import firebase from 'firebase'
import HeaderRecette from "../../components/headerRecette"
import starOn from "../../assets/images/star-on.png"
import cookTime from "../../assets/images/cook_time.png"
import chef from "../../assets/images/chef.png"
import serving from "../../assets/images/servings.png"
import "./recetteid.css"
import download from 'downloadjs'
import ReactStars from "react-rating-stars-component";
import TopbarRecettes from "../../components/TopbarRecettes";
import Loader from "../../components/Loader";
import Topbar from "../../components/TopbarRecettes";
import  recetteService from "../../provider/webservice"
import A from "../../assets/images/nutriscore/A.png"
import B from "../../assets/images/nutriscore/B.png"
import C from "../../assets/images/nutriscore/C.png"
import D from "../../assets/images/nutriscore/D.png"
import E from "../../assets/images/nutriscore/E.png"
import Button from '@material-ui/core/Button';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import  pdf from '../../assets/doc/PadthaiNL.pdf'

const endpoint = process.env.REACT_APP_endpoint;

class RecetteId extends Component {
    constructor(props){
        super();
        this.state={
            recettes:[],
            recette:"",
            Ingredients:[]

        }
    }

    componentWillMount() {

        let id = this.props.match.params.id

        recetteService.getRecettebyID(id).then(res=> {
            this.setState({recette:res[0]})
            console.log(res[0])
        })

        recetteService.getIngredientID(id).then(res=>{
            this.setState({Ingredients:res})
        })

    }

    async pdf(recette,ingredients) {
        const url = pdf
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

        const pdfDoc = await PDFDocument.load(existingPdfBytes)
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
        const pages = pdfDoc.getPages()
        const firstPage = pages[0]
        const { width, height } = firstPage.getSize()
        // Draw a string of text diagonally across the first page
        firstPage.drawText(recette.list_Nombre_person.toString(), {
            x: 200,
            y: height / 2 + 295,
            size: 18,
            font: helveticaFont,
            color: rgb(0, 0, 0),
            rotate: degrees(0),
        })
        firstPage.drawText(recette.list_Duree_Cuission.toString(), {
            x: 195,
            y: height / 2 + 280,
            size: 14,
            font: helveticaFont,
            color: rgb(0, 0, 0),
            rotate: degrees(0),
        })

        let y=200

        ingredients.map((item,key)=>{
            firstPage.drawText(("- "+item.nom_Ingr+" "+item.dose_Ingre.toString()+" g" ), {
                x: 10,
                y: height / 2 + y,
                size: 14,
                font: helveticaFont,
                color: rgb(0, 0, 0),
                rotate: degrees(0),
            })
            y=y-50
        })

        firstPage.drawText(recette.list_Gramme_Glucide.toString()+" g", {
            x: 850,
            y: height / 2 + 280,
            size: 14,
            font: helveticaFont,
            color: rgb(0, 0, 0),
            rotate: degrees(0),
        })
        firstPage.drawText(recette.list_Gramme_Lipide.toString()+" g", {
            x: 850,
            y: height / 2 + 260,
            size: 14,
            font: helveticaFont,
            color: rgb(0, 0, 0),
            rotate: degrees(0),
        })
        firstPage.drawText(recette.list_Gramme_Proteine.toString()+" g", {
            x: 850,
            y: height / 2 + 300,
            size: 14,
            font: helveticaFont,
            color: rgb(0, 0, 0),
            rotate: degrees(0),
        })

        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save()

        // Trigger the browser to download the PDF document
        download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");




    }

    ratingChage=(d)=>{
        console.log(d)

    }




    render() {
       let  rec = this.state.recette
        let ing = this.state.Ingredients
        return (
            <div className="">
                <div className="header">
                <Topbar history={this.props.history}></Topbar>
                {this.state.loading === true &&
                <Loader percentage={this.state.percentage+"%"}>

                </Loader>
                }
                </div>


                <div className="wrapper ">

               <div className="container-fluid " style={{paddingBottom:100}}>
                   <div className="text-left">
                       <h1 style={{color:"#00ba4c" ,fontFamily:"cursive"}}>{rec.list_nomRecette}</h1>
                   </div>
                   <div className="row mt-2">
                       <div>
                           <h4>par Zairi Jawher

                           </h4>
                       </div>
                       <div>
                           <ul className="navRecette" style={{display:"inline-block"}}>


                               <li><img src={starOn}/></li>


                               <li><img src={starOn}/></li>
                               <li><img src={starOn}/></li>
                               <li><img src={starOn}/></li>
                               <li><img src={starOn}/></li>


                               <li className="votes">(80 votes)</li>
                           </ul>
                       </div>



                   </div>
                   <div className="mt-2">
                       <div className="row">
                           <div className="col-md-auto">
                               <div className="row align-items-center">

                                       <img  src={cookTime}/>


                                       <div style={{marginLeft:5}}>

                                           <div>

                                           <text> Preparation : {rec.list_Duree_prepa_repas}</text>
                                           </div>
                                           <div>
                                               <text>
                                                   Cuisson: {rec.list_Duree_Cuission}
                                               </text>

                                           </div>
                                       </div>



                               </div>


                           </div>
                           <div className="col-md-auto ml-3">
                               <div className="row align-items-center">

                                   <img  src={chef}/>


                                   <div style={{marginLeft:5}}>

                                       <div>

                                           <text> Facile</text>
                                       </div>

                                   </div>



                               </div>

                           </div>
                           <div className="col-md-auto ml-3">
                               <div className="row align-items-center">

                                   <img  src={serving}/>


                                   <div style={{marginLeft:5}}>

                                       <div>

                                           <text>{rec.list_Nombre_person + " " +"personnes"}</text>
                                       </div>

                                   </div>



                               </div>

                           </div>


                       </div>

                       <div className="row mt-2 align-items-center">
                           {rec.nutriscore==="A"&&
                           <div className="col-md-2">
                               <img src={A} style={{width:"100%"}}/>
                           </div>}
                           {rec.nutriscore==="B"&&
                           <div className="col-md-2">
                               <img src={B} style={{width:"100%"}}/>
                           </div>}
                           {rec.nutriscore==="C"&&
                           <div className="col-md-2">
                               <img src={C} style={{width:"100%"}}/>
                           </div>}
                           {rec.nutriscore==="D"&&
                           <div className="col-md-2">
                               <img src={D} style={{width:"100%"}}/>
                           </div>}
                           {rec.nutriscore==="E"&&
                           <div className="col-md-2">
                               <img src={E} style={{width:"100%"}}/>
                           </div>}

                           <div className="col-md-1 text-center">

                               <h3>Proteines</h3>


                               <h3 className="font-weight-bold">{rec.list_Gramme_Proteine+" g"}</h3>

                           </div>
                           <div className="col-md-1 text-center">

                               <h3>Glucides</h3>


                               <h3 className="font-weight-bold">{rec.list_Gramme_Glucide+" g"}</h3>

                           </div>
                           <div className="col-md-1 text-center">

                               <h3>Lipides</h3>


                               <h3 className="font-weight-bold">{rec.list_Gramme_Lipide+" g"}</h3>

                           </div>

                       </div>

                   </div>

                   <div className="row align-items-start mt-3">
                       <div className="col-md-4 text-center">
                           <img src={rec.list_photo} style={{width:"100%"}}/>

                           <div className="mt-3">
                               <div >
                                   <h3 style={{fontFamily:"sans-serif"}}> Je note la recette </h3>
                               </div>
                               <div  >
                                   <ReactStars
                                       classNames="ReactStars"
                                       value={5}
                                       count={5}
                                       onChange={this.ratingChage}
                                       size={30}
                                       activeColor="#ffd700"
                                   />
                               </div>
                           </div>

                           <div className="mt-3">
                               <Button onClick={()=>{this.pdf(this.state.recette,this.state.Ingredients)}} variant="contained" color="secondary">
                                   Telecharger PDF
                               </Button>
                           </div>


                       </div>
                       <div className="col-md-8">

                           <div>
                               <h3 style={{fontFamily:"cursive",color:"#00ba4c"}}>INGRÉDIENTS</h3>
                           </div>

                           {ing!=[] && ing.map((item,key)=>(
                               <div className="mt-3">
                                   <text style={{fontSize:"1.2vw"}}>   {"- "+item.dose_Ingre+"g "+item.nom_Ingr} </text>
                               </div>
                           ))}



                           <div className="mt-3">
                               <h3 style={{fontFamily:"cursive",color:"#00ba4c"}}>PREPARATION</h3>

                           </div>




                       </div>


                   </div>
               </div>
                </div>




            </div>
        );
    }
}

export default RecetteId;
