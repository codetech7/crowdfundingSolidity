import React from 'react';
import {Menu} from 'semantic-ui-react';


const Header = ()=>(

<Menu style = {{margin:"10px"}}>
    <Menu.Item>AfriCharity</Menu.Item>

    <Menu.Menu position="right"> 
        <Menu.Item>List of Charity projects</Menu.Item>
        <Menu.Item>+</Menu.Item>
    </Menu.Menu>
</Menu>
)
export default Header;