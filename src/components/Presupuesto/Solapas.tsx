import { useState } from 'react'

export const Solapas = () => {

    const [adjuntos, setAdjuntos] = useState<boolean>(false);
    const [otros, setOtros] = useState<boolean>(false);

    const MostrarAdjuntos = () => {
        ColapsarTodos()
        if (adjuntos)
            setAdjuntos(false);
        else
            setAdjuntos(true);
    }

    const MostrarOtros = () => {
        ColapsarTodos()
        if (otros)
            setOtros(false);
        else
            setOtros(true);
    }

    const ColapsarTodos = () => {
        setAdjuntos(false);
        setOtros(false);
    }

    return (
        <div className="row mt-2">
            <div className="col-12">
                <p className="d-inline-flex gap-1">
                    <button className="btn btn-primary" type="button" onClick={() => MostrarAdjuntos()}>
                        Adjuntos
                    </button>
                    <button className="btn btn-primary" type="button" onClick={() => MostrarOtros()}>
                        Otros
                    </button>
                </p>
                {adjuntos ?
                    <div className="card card-body">
                        <div className="mb-3">
                            <label htmlFor="formFileMultiple" className="form-label">Certificado discapacidad</label>
                            <input className="form-control" type="file" id="formFileMultiple" multiple />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formFileMultiple" className="form-label">Orden medica</label>
                            <input className="form-control" type="file" id="formFileMultiple" multiple />
                        </div>
                    </div>
                    : <></>}
                {otros ?
                    <div className="card card-body">
                        Otros
                    </div>
                    : <></>}
            </div>
        </div>
    )
}
