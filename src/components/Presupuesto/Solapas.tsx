export const Solapas = () => {
    return (
        <div className="row mt-2">
            <div className="col-12">
                    <div className="mb-3">
                        <label htmlFor="formFileMultiple" className="form-label">Certificado discapacidad</label>
                        <input className="form-control" type="file" id="formFileMultiple" multiple />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formFileMultiple" className="form-label">Orden medica</label>
                        <input className="form-control" type="file" id="formFileMultiple" multiple />
                    </div>
            </div>
        </div>
    )
}
