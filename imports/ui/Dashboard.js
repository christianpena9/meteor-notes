import React from 'react';

import PrivateHeader from './PrivateHeader';

export default () => {
    return(
        <div>
            <PrivateHeader title="Dashbord"/>
            <div className="page-content">
                Dashbord Page Content
            </div>
        </div>
    );
};