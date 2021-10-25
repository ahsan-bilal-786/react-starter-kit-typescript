import React, { FC } from "react"
import { Spinner } from "react-bootstrap"

interface ILoaderTypes {
    typeOfVariant: string
}
const Loader:FC<ILoaderTypes> = ({typeOfVariant}) => {
    return (
        <div className="text-center">
            <Spinner animation="border" variant={typeOfVariant} />
        </div>
    );
}

export default Loader
