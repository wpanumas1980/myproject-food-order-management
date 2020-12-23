import React, { useContext } from 'react';
import { Switch, Route } from "react-router-dom";
import { AuthContext } from "../../auth/Auth";
import RolesList from '../../config/roles';
import NotFound from "../page/PageNotFound/PageNotFound";


function PrivateRoutes() {
    const { role } = useContext(AuthContext);

    return (
        <>
            <Switch>
                {RolesList[role].map(({ path, page: PageComponent }) => <Route exact path={path}>
                    <PageComponent />
                </Route>)}
                <Route path="*" component={NotFound} />
            </Switch>
        </>
    );
}

export default PrivateRoutes;
