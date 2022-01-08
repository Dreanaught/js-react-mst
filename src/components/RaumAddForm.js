import React from "react"
import { observer } from "mobx-react"
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup"
import { v4 as uuidv4 } from 'uuid';

const RaumAddForm = (props) => {
    const formik = useFormik({
        initialValues: {
            id: uuidv4(),
            Name: '',
            Geschoss: '',
            Auslegungsinnentemperatur: '',
            Raumbreite: '',
            Raumlänge: '',
            Raumhöhe: '',
            Deckendicke: '',
        },
        validationSchema: Yup.object({
            Name: Yup.string()
                .required('Required'),
            Geschoss: Yup.string()
                .required('Required'),
            Auslegungsinnentemperatur: Yup.number()
                .required('Required'),
            Raumbreite: Yup.number()
                .required('Required'),
            Raumlänge: Yup.number()
                .required('Required'),
            Raumhöhe: Yup.number()
                .required('Required'),
            Deckendicke: Yup.number()
                .required('Required'),
        }),
        onSubmit: values => {
            //alert(JSON.stringify(values, null, 2));
            props.onSubmit(values)
            formik.resetForm({
                values: {
                    id: uuidv4(),
                    Name: '',
                    Geschoss: '',
                    Auslegungsinnentemperatur: '',
                    Raumbreite: '',
                    Raumlänge: '',
                    Raumhöhe: '',
                    Deckendicke: '',
                }
            })
        }
    });
    return (
        <Form
            noValidate
            onSubmit={formik.handleSubmit}
            id="AddRaum"
        >
            <Form.Group controlId="Name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Name}
                    isInvalid={formik.touched.Name && !!formik.errors.Name}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.Name}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="Geschoss">
                <Form.Label>Geschoss</Form.Label>
                <Form.Control
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Geschoss}
                    isInvalid={formik.touched.Geschoss && !!formik.errors.Geschoss}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.Geschoss}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="Auslegungsinnentemperatur">
                <Form.Label>Auslegungsinnentemperatur</Form.Label>
                <Form.Control
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Auslegungsinnentemperatur}
                    isInvalid={formik.touched.Auslegungsinnentemperatur && !!formik.errors.Auslegungsinnentemperatur}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.Auslegungsinnentemperatur}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="Raumbreite">
                <Form.Label>Raumbreite</Form.Label>
                <Form.Control
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Raumbreite}
                    isInvalid={formik.touched.Raumbreite && !!formik.errors.Raumbreite}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.Raumbreite}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="Raumlänge">
                <Form.Label>Raumlänge</Form.Label>
                <Form.Control
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Raumlänge}
                    isInvalid={formik.touched.Raumlänge && !!formik.errors.Raumlänge}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.Raumlänge}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="Raumhöhe">
                <Form.Label>Raumhöhe</Form.Label>
                <Form.Control
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Raumhöhe}
                    isInvalid={formik.touched.Raumhöhe && !!formik.errors.Raumhöhe}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.Raumhöhe}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="Deckendicke">
                <Form.Label>Deckendicke</Form.Label>
                <Form.Control
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Deckendicke}
                    isInvalid={formik.touched.Deckendicke && !!formik.errors.Deckendicke}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.Deckendicke}
                </Form.Control.Feedback>
            </Form.Group>
        </Form>
    );
}

export default observer(RaumAddForm)