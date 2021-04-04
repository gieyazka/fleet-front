import React from "react";
import Layout, {
  BasicAppBar,
  BasicFooter,
  BasicDrawer,
} from "material-ui-layout";

import Home from "@material-ui/icons/Home";
import AuthSerice from "../components/AuthService";

const Auth = new AuthSerice();

// Defined here for link format reference
const links_administration = [
  {
    icon: Home,
    href: "/home",
    label: "Home",
  },
  // {
  //   iconName: 'add_circle',
  //   href: '/addinvoice',
  //   label: 'Add Order',
  // },
  // {
  //   iconName: 'map',
  //   href: 'map',
  //   label: 'Real-time Location',
  // },
  {
    iconName: "view_list",
    href: "invoicelistadmin",
    label: "Order List",
  },
  // {
  //   iconName: 'sync',
  //   href: '#',
  //   label: 'Sync POIs & Vehs',
  //   onClick: () => {
  //     axios.get(`${server.url}/vehicles/syncData`).then(res => {
  //       if (res.data[0] ==='OK'){
  //         alert('Vehicle data synced successfully')
  //       }
  //     }).catch (err => {
  //       alert('Vehicle data synced fails', JSON.stringify(err))
  //     }).then(()=>{
  //       axios.get(`${server.url}/pois/syncData`).then(res => {
  //         if (res.data[0] ==='OK'){
  //           alert('POI data synced successfully')
  //         }
  //       }).catch (err => {
  //         alert('POI data synced fails', JSON.stringify(err))
  //       }).then(()=>{
  //         axios.get(`${server.url}/drivers/syncData`).then(res => {
  //           if (res.data[0] ==='OK'){
  //             alert('Driver data synced successfully')
  //           }
  //         }).catch (err => {
  //           alert('Driver data synced fails', JSON.stringify(err))
  //         })
  //       })
  //     })
  //   },
  // },

  {
    iconName: "person",
    href: "#",
    label: "Logout",
    onClick: () => Auth.logout(),
  },
];
const links_user = [
  {
    icon: Home,
    href: "/home",
    label: "Home",
  },
  {
    iconName: "add_circle",
    href: "/addinvoice",
    label: "Add Order",
  },
  {
    iconName: "map",
    href: "/map",
    label: "Real-time Location",
  },
  {
    iconName: "view_list",
    href: "/invoicelist",
    label: "Order List",
  },
  {
    iconName: "person",
    href: "form",
    label: "Form",
  },
  {
    iconName: "view_list",
    href: "request",
    label: "Request Table",
  },
  {
    iconName: "person",
    href: "#",
    label: "Logout",
    onClick: () => Auth.logout(),
  },
];

const links_purchaser = [
  {
    icon: Home,
    href: "/home",
    label: "Home",
  },
  {
    iconName: "view_list",
    href: "/invoicelist",
    label: "Order List",
  },
  {
    iconName: "attach_money",
    href: "/priceDB",
    label: "Price Database",
  },
  {
    iconName: "person",
    href: "#",
    label: "Logout",
    onClick: () => Auth.logout(),
  },
];

const links_supplier = [
  {
    icon: Home,
    href: "/home",
    label: "Home",
  },
  {
    iconName: "map",
    href: "/map",
    label: "Real-time Location",
  },
  {
    iconName: "view_list",
    href: "/invoicelist",
    label: "Order List",
  },
  {
    iconName: "person",
    href: "#",
    label: "Logout",
    onClick: () => Auth.logout(),
  },
];

const links_admin = [
  {
    icon: Home,
    href: "/home",
    label: "Home",
  },
  {
    iconName: "add_circle",
    href: "/addinvoice",
    label: "Add Order",
  },
  {
    iconName: "map",
    href: "/map",
    label: "Real-time Location",
  },
  {
    iconName: "view_list",
    href: "/invoicelist",
    label: "Order List",
  },
  {
    iconName: "person",
    href: "#",
    label: "Logout",
    onClick: () => Auth.logout(),
  },
];

function getDrawer() {
  switch (localStorage.getItem("role")) {
    case "Administrator":
      return links_administration;
    case "admin":
      return links_admin;
    case "issuer":
      return links_user;
    case "purchaser":
      return links_purchaser;
    case "supplier":
      return links_supplier;
    default:
      return null;
  }
}

class AppLayout extends React.Component {
  render() {
    const { children, history } = this.props;
    return (
      <Layout
        stickyFooter // default false
        mainGrow={false} // default true
        // appBarPosition={"static"} //default value
        // appBarContent={
        //   <BasicAppBar title={"Delivery Management System"} menuIconAlways />
        // }
   
        // footerContent={
        //   history.location.pathname !== "/map" ? (
        //     <BasicFooter
        //       title={"Powermap"}
        //       logo={require("../assets/images/logo.png")}
        //     />
        //   ) : null
        // } 
        // leftDrawerUnder // default false
        // leftDrawerContent={<BasicDrawer links={getDrawer()} />} // If no content it will render null
        // leftDrawerType="persistent" // default temporary

      >
        {children}
      </Layout>
    );
  }
}

export default AppLayout;
