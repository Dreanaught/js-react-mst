import React from "react"
import { observer } from "mobx-react"
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup"

const ElementAddForm = (props) => {
    const raum = props.raum
    const bauelemente = raum.Bauelemente
    const formik = useFormik({
        initialValues: {
            Orientierung: '',
            Bauteil: '',
            Anzahl: 1,
            Breite: '',
            Länge_Höhe: '',
            grenzt_an: 'e',
            angrenzende_Temperatur: undefined,
            temperatur_Anpassung: '',
        },
        validationSchema: Yup.object({
            Bauteil: Yup.string()
                .required('Required'),
            Anzahl: Yup.number()
                .min(1, 'Must be greater equal 1')
                .required('Required'),
            Breite: Yup.number()
                .required('Required'),
            Länge_Höhe: Yup.number()
                .required('Required'),
            grenzt_an: Yup.string()
                .required('Required'),
            angrenzende_Temperatur: Yup.number(),
            temperatur_Anpassung: Yup.number()
                .required('Required'),
        }),
        onSubmit: values => {
            //alert(JSON.stringify(values, null, 2));
            props.onSubmit(values)
            formik.resetForm()
        }
    });
    return (
        <Form
            noValidate
            onSubmit={formik.handleSubmit}
            id="AddElement"
        >
            <Form.Group controlId="Bauteil">
                <Form.Label>Bauteil</Form.Label>
                <Form.Select
                    value={formik.values.Bauteil}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.Bauteil && !!formik.errors.Bauteil}>
                    <option>Wähle Bauteil</option>
                    {Array.from(bauelemente).map((bauelement, idx) => (
                        <option key={idx} value={bauelement.id}>{bauelement.Kurzbezeichner + ' ' + bauelement.uWert + ' W\\m²K'}</option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    {formik.errors.Bauteil}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="Orientierung">
                <Form.Label>Orientierung</Form.Label>
                <Form.Select
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Orientierung}
                    isInvalid={formik.touched.Orientierung && !!formik.errors.Orientierung}>
                    <option value=''></option>
                    <option value='N'>N</option>
                    <option value='S'>S</option>
                    <option value='O'>O</option>
                    <option value='W'>W</option>
                    <option value='H'>H</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    {formik.errors.Orientierung}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="Anzahl">
                <Form.Label>Anzahl</Form.Label>
                <Form.Control
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Anzahl}
                    isInvalid={formik.touched.Anzahl && !!formik.errors.Anzahl}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.Anzahl}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="Breite">
                <Form.Label>Breite</Form.Label>
                <Form.Control
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Breite}
                    isInvalid={formik.touched.Breite && !!formik.errors.Breite}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.Breite}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="Länge_Höhe">
                <Form.Label>Länge_Höhe</Form.Label>
                <Form.Control
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Länge_Höhe}
                    isInvalid={formik.touched.Länge_Höhe && !!formik.errors.Länge_Höhe}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.Länge_Höhe}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="grenzt_an">
                <Form.Label>grenzt_an</Form.Label>
                <Form.Select
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.grenzt_an}
                    isInvalid={formik.touched.grenzt_an && !!formik.errors.grenzt_an}>
                    <option value='e'>e, Außenluft</option>
                    <option value='b'>b, N-R beheizt</option>
                    <option value='u'>u, N-R unbeheizt </option>
                    <option value='g'>g, Erdreich</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    {formik.errors.grenzt_an}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="angrenzende_Temperatur">
                <Form.Label>angrenzende_Temperatur</Form.Label>
                <Form.Control
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.angrenzende_Temperatur}
                    isInvalid={formik.touched.angrenzende_Temperatur && !!formik.errors.angrenzende_Temperatur}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.angrenzende_Temperatur}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="temperatur_Anpassung">
                <Form.Label>temperatur_Anpassung</Form.Label>
                <Form.Control
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.temperatur_Anpassung}
                    isInvalid={formik.touched.temperatur_Anpassung && !!formik.errors.temperatur_Anpassung}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.temperatur_Anpassung}
                </Form.Control.Feedback>
            </Form.Group>
            
        </Form>
    );
};

export default observer(ElementAddForm)