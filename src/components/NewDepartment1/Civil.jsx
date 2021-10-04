import React,{useState} from 'react';
//import AcUnitIcon from '@mui/icons-material/AcUnit';
//import AcUnitIcon from '@mui/icons-material/AcUnit';
//import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link, useRouteMatch } from "react-router-dom";


import { Form, Button, Col, Row } from "react-bootstrap";

import './Civil.css'
import { Home,Fsac, Learn,Pandp,Comm,Prof,Tandl,Iii,Value,Guest,Swayam,Randc,Events,Ach,News,Gly } from './Home';



const Civil = ({heading,paragraphOne}) => {
    const match = useRouteMatch();
    console.log("mactj", heading);
    console.log("paragraphOne", paragraphOne);
    const [component,setComponent] = useState('home')
    return (
        <React.Fragment>
       
        <div class="sidebar">
           
                <a onClick={()=> setComponent('home') } className="active">Vision & Mission</a>
                <a onClick={() => setComponent('Pandp')}>PEO'S & PO'S</a>
                <a onClick={() => setComponent('Fsac')}>Faculty</a>
                <a onClick={() => setComponent('Comm')} >Committees</a>
                <a onClick={() => setComponent('Tandl')} >Teaching and Learnings</a>
                <a onClick={() => setComponent('Prof')}>Professional Societies</a>
                <a onClick={() => setComponent('Iii')}>Industry institute Interaction</a>
                <a onClick={() => setComponent('Value')}>Value Added / Add On Courses</a>
                <a onClick={() => setComponent('Guest')}>Guest Lectures / Content Beyond Syllabus</a>
                <a href="">Infratecture</a>
                <a onClick={() => setComponent('Swayam')}>Swayam and MOOC'S</a>
                <a onClick={() => setComponent('Randc')}>Research and Consultancy</a>
                <a onClick={() => setComponent('Events')}>Events and Fests</a>
                <a onClick={() => setComponent('Ach')}>Achivements</a>
                <a onClick={() => setComponent('News')}>News Letter</a>
                <a onClick={() => setComponent('Gly')}>Gallery</a>

            </div>
            
            {
           component === 'home' ?
             <Home head={heading} paragraph={paragraphOne} /> :
                 component === 'Fsac' ? <Fsac /> :
                 component === 'Pandp' ? <Pandp/> :
                 component === 'Learn' ? <Learn /> :
                 component === 'Comm' ? <Comm /> :
                 component === 'Tandl' ? <Tandl /> :
                 component === 'Prof' ? <Prof /> :
                 component === 'Iii' ? <Iii /> :
                 component === 'Value' ? <Value /> :
                 component === 'Guest' ? <Guest /> :
                 component === 'Swayam' ? <Swayam /> :
                 component === 'Randc' ? <Randc /> :
                 component === 'Events' ? <Events /> :
                 component === 'Ach' ? <Ach /> :
                 component === 'News' ? <News /> :
                 component === 'Gly' ? <Gly/>:null
    
            }
           </React.Fragment> 

    );
};

export default Civil;


