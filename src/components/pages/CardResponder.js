<Card raised={false} className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.avatar}>
                            F
                            </Avatar>
                        }
                        action={
                            <div>
                                <Chip
                                    label="react"
                                    className={classes.chip}
                                    color='primary'
                                />
                                <IconButton>
                                    <MoreVertIcon />
                                </IconButton>
                                </div>
                        }
                        title="@flpegomes"
                        subheader="September 14, 2016"
                    />
                        
                    <CardContent>
                        <Typography variant='h6' component="p">
                            Impressive paella 
                        </Typography>
                        <Typography component="p">
                            This impressive paella is a perfect party dish and a fun meal to cook together with your
                            guests. Add 1 cup of frozen peas along with the mussels, if you like.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <form className={classes.container} noValidate autoComplete="off">
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Responder"
                                multiline
                                rowsMax="4"
                                value={multiline}
                                onChange={this.handleChange('multiline')}
                                className={classes.textField}
                                margin="dense"
                                helperText={(
                                    <div className={classes.root}>
                                        <div className={classes.grow}>
                                            <span >responder post de @flpegomes</span>
                                        </div>
                                        <div>
                                            {count < 20 ? (
                                                <span style={{color:'#ff0000'}}>
                                                    {count}
                                                </span>
                                            ) 
                                            :(
                                            <span>
                                                {count}
                                            </span>
                                            )}
                                           
                                        </div>
                                    </div>
                                    
                                )}
                                variant="filled"
                                fullWidth
                                maxLength={300}
                                error={count < 0}
                            />  
                        </form>

                        <Button variant="contained" color="primary" className={classes.button}>
                        Enviar
                        </Button>
                    </CardActions>
                </Card>
