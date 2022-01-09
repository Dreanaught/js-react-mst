import React from "react"
import { observer } from "mobx-react"
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup"
import { v4 as uuidv4 } from 'uuid';

const BauteilAddForm = (props) => {
    const formik = useFormik({
        initialValues: {
            id: uuidv4(),
            Kurzbezeichner: 'AW',
            Kommentar: '',
            uWert: '',
        },
        validationSchema: Yup.object({
            id: Yup.string().required(),
            Kurzbezeichner: Yup.string().required(),
            Kommentar: Yup.string(),
            uWert: Yup.number().required().positive(),
        }),
        onSubmit: values => {
            //alert(JSON.stringify(values, null, 2));
            props.onSubmit(values)
            formik.resetForm({
                values: {
                    id: uuidv4(),
                    Kurzbezeichner: 'AW',
                    Kommentar: '',
                    uWert: ''
                }
            })
        }
    });

    return (
        <Form
            noValidate
            onSubmit={formik.handleSubmit}
            id="AddBauteil"
        >
            <Form.Group controlId="Kurzbezeichner">
                <Form.Label>Typ</Form.Label>
                <Form.Select
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Kurzbezeichner}
                    isInvalid={formik.touched.Kurzbezeichner && !!formik.errors.Kurzbezeichner}>
                    <option value='AW'>AußenWand</option>
                    <option value='AF'>AußenFenster</option>
                    <option value='AT'>AußenTür</option>
                    <option value='IW'>InnenWand</option>
                    <option value='IF'>InnenFenster</option>
                    <option value='IT'>InnenTür</option>
                    <option value='D'>Decke</option>
                    <option value='FB'>Fußboden</option>
                    <option value='DA'>Dach</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    {formik.errors.Kurzbezeichner}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="uWert">
                <Form.Label>U-Wert</Form.Label>
                <Form.Control
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.uWert}
                    isInvalid={formik.touched.uWert && !!formik.errors.uWert}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.uWert}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="Kommentar">
                <Form.Label>Kommentar</Form.Label>
                <Form.Control
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Kommentar}
                    isInvalid={formik.touched.Kommentar && !!formik.errors.Kommentar}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.Kommentar}
                </Form.Control.Feedback>
            </Form.Group>
        </Form>
    );
}

export default observer(BauteilAddForm)