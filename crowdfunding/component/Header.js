import React from 'react';
import {Menu} from 'semantic-ui-react';
import { Link } from '../routes';

const Header = ()=>(

<Menu style = {{margin:"10px"}}>
    <Menu.Item>
    <Link route = "/">
        <a>
        AfriCharity
        </a>
    </Link>
    </Menu.Item>
    
    <Menu.Menu position="right"> 
        <Menu.Item>
            <Link route = "/">
                <a>
                     Charity Projects
                 </a>
            </Link>
         </Menu.Item>
        <Menu.Item>
            <Link route = "/campaigns/new-charity-project">
                <a>
                    +
                </a>
            </Link>
        </Menu.Item>
    </Menu.Menu>
</Menu>
)
export default Header;