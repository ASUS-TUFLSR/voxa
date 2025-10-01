"use client";
import * as React from 'react';

interface Props {
    params: Promise<{ id: string }>;
}

const EditPage =  ({ params } : Props) => {
    const resolvedParams = React.use(params);
    // React.use is mandatory here cause When working with Next.js 15 or later, the params object, 
    // particularly when passed to Client Components from a Server Component, may be a Promise.
    //  To access its properties, it needs to be unwrapped using React.use().
    return (
        <div>
            <h1>{resolvedParams.id}</h1>
        </div>
    )
}

export default EditPage;