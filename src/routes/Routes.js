import React from "react";
import { BrowserRouter as Router, Switch, Link, Route,useRouteMatch } from "react-router-dom";
import { Home } from "../components/Home/Home";
import {
  HomeCommonAboutUs,
  HomeCommonDepartment,
  HomeCommonCources,
  HomeCommonAdmission,
  HomeCommonPlacements,
  HomeCommonFeatures,
  HomeCommonEvents,
  HomeCommonGallery,
  HomeCommonExaminationCenter,
  HomeCommonRandDCell,
  HomeCommonContactUs,
} from "../components/Home/HomeCommonIndex";
import { HomeCommon } from "../components/Home/HomeCommon";
import { ProductsList } from "../components/ProductsList/ProductsList";
import { EmployeesList } from "../components/Employees/EmployeesList/EmployeesList";
import { Contacts } from "../components/Contacts/Contacts";
import { AboutUs } from "../components/AboutUs/AboutUs";
import { Admission } from "../components/Admission/Admission";
import { Events } from "../components/Events/Events";
import { Gallery } from "../components/Gallery/Gallery";
import { Courses } from "../components/Courses/Courses";
import { Placement } from "../components/Placement/Placement";
import { Services } from "../components/Services/Services";
import { NavbarCategory } from "../components/ProductsList/NavbarCategory";
import { ProductDetails } from "../components/ProductDetails/ProductDetails";
import { EmployeeOverview } from "../components/Common/Employee/EmployeeOverview";
import Civil from "../components/NewDepartment1/Civil";

import {MechData,ElectricalData,CivilData,PetroliumData,InformationData,MasterData,ComputerData,ScienceData,ElectronicData} from '../components/NewDepartment1/data'

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact={true} />
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/contacts" component={Contacts} />
      <Route path="/aboutus" component={AboutUs} />
      <Route path="/admission" component={Admission} />
      <Route path="/events" component={Events} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/courses" component={Courses} />
      <Route path="/placement" component={Placement} />
      <Route path="/productdetail" component={ProductDetails} />
      <Route path="/services" component={Services} />
      <Route path="/productlist" component={ProductsList} />
      <Route path="/employeelist" component={EmployeesList} />
      <Route path="/employeeoverview" component={EmployeeOverview} />
      <Route path="/NavbarCategory" component={NavbarCategory} />
      <Route path="/homecommon40" component={HomeCommonAboutUs} />
      <Route path="/homecommon142" component={HomeCommonCources} />
      <Route path="/homecommon18" component={HomeCommonDepartment} />
      <Route path="/homecommon37" component={HomeCommonAdmission} />
      <Route path="/homecommon58" component={HomeCommonPlacements} />
      <Route path="/homecommon62" component={HomeCommonFeatures} />
      <Route path="/homecommon75" component={HomeCommonEvents} />
      <Route path="/homecommon88" component={HomeCommonGallery} />
      <Route path="/homecommon131" component={HomeCommonExaminationCenter} />
      <Route path="/homecommon204" component={HomeCommonRandDCell} />
      <Route path="/homecommon136" component={HomeCommonContactUs} />
      <Route path="/homecommon" component={HomeCommon} />
      <Route path="/mech" render={(props) => <Civil {...MechData} />} />
      <Route path="/cse" render={(props) => <Civil {...ComputerData} />} />
      <Route path="/civil" render={(props) => <Civil {...CivilData} />} />
      <Route path="/eee" render={(props) => <Civil {...ElectricalData} />} />
      <Route path="/pe" render={(props) => <Civil {...PetroliumData} />} />
      <Route path="/it" render={(props) => <Civil {...InformationData} />} />
      <Route path="/e&c" render={(props) => <Civil {...ElectronicData} />} />
      <Route path="/mba" render={(props) => <Civil {...MasterData} />} />
       <Route path="/s&h" render={(props) => <Civil {...ScienceData} />} />

    </Switch>
  );
};

export default Routes;
