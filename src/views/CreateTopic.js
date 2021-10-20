import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import * as Yup from 'yup';
import { Formik } from 'formik';

import {
  Box, Button,
  Card, CardContent,
  CardHeader, Divider,
  FormHelperText, Grid,
  TextField, makeStyles
} from '@material-ui/core';

import FilesDropzone from '../components/FilesDropzone';

const useStyles = makeStyles(() => ({
  root: {},
}));

const CreateTopic = ({ className, ...rest }) => {
  
    const classes = useStyles();
    const history = useHistory();

    return (
    <Formik
      initialValues={{
        name: '',
        avatar: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required(),
        avatar: Yup.string().max(255).required()
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          
            // NOTE: Make API request

          setStatus({ success: true });
          setSubmitting(false);

          history.push('/');
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        touched,
        values
      }) => (
        <form
          onSubmit={handleSubmit}
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
              lg={8}
            >
              <Card>
                <CardContent>
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Product Name"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    variant="outlined"
                  />
                 
                </CardContent>
              </Card>
              <Box mt={3}>
                <Card>
                  <CardHeader title="Upload Avatar" />
                  <Divider />
                  <CardContent>
                    <FilesDropzone />
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>
                {errors.submit}
              </FormHelperText>
            </Box>
          )}
          <Box mt={2}>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              Create Topic
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

CreateTopic.propTypes = {
  className: PropTypes.string
};

export default CreateTopic;
