import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import {useState, useEffect} from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const App = () => {

    const useStyles = makeStyles((theme) => ({

        textField: {
            margin: "10px 0",
            width: "30%",
            height: "50px"
        },
        app: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
        },
        button: {
            margin: "10px 0"
        },
        heading: {
            textShadow: "1px 1px #ff0000"
        },
        table: {
            width: "600px"
        }

    }));

    const [cars, setCars] = useState([]);
    const [brand, setBrands] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [horsePower, setHorsePower] = useState("");
    const [isValid, setIsValid] = useState(false);

    const classes = useStyles();

    const addCarHandler = () => {
        // alert("Button was clicked")
        const oldCars = [...cars];
        const newCar = {
            brand,
            model,
            year,
            horsePower,
            id: Math.floor(Math.random() * 1000)
        }

        const newCars = oldCars.concat(newCar);

        if (brand === "" || model === "" || year === "" || horsePower === "") {
            alert("Fields cannot be blank");
            setIsValid(true);
        } else {
            setIsValid(false);


        }

        setCars(newCars);

        localStorage.setItem("cars",JSON.stringify(newCars));

        setBrands("");
        setModel("");
        setYear("");
        setHorsePower("");
    };

    const deleteCarHandler = (id) => {
        const oldCars = [...cars];
        const newCars = oldCars.filter((car) => car.id !== id);
        setCars(newCars);
    };

    useEffect(() => {
        const localStorageCars = JSON.parse(localStorage.getItem("cars"));
        setCars(localStorageCars);
    },[setCars]);

    return (
        <div className={classes.app}>
            <h1 className={classes.heading}>Car Registration Application </h1>
            <TextField
                id="outlined-basic"
                label="Brand"
                variant="outlined"
                className={classes.textField}
                onChange={(e) => setBrands(e.target.value)}
                value={brand}
                error={isValid}
            />
            <TextField
                id="outlined-basic"
                label="Model"
                variant="outlined"
                className={classes.textField}
                onChange={(e) => setModel(e.target.value)}
                value={model}
                error={isValid}

            />
            <TextField
                id="outlined-basic"
                label="Year"
                variant="outlined"
                className={classes.textField}
                onChange={(e) => setYear(e.target.value)}
                value={year}
                error={isValid}

            />
            <TextField
                id="outlined-basic"
                label="HorsePower"
                variant="outlined"
                className={classes.textField}
                onChange={(e) => setHorsePower(e.target.value)}
                value={horsePower}
                error={isValid}

            />
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={addCarHandler}
            >
                Register Car
            </Button>

            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Brand</TableCell>
                        <TableCell align="center">Model</TableCell>
                        <TableCell align="center">Year</TableCell>
                        <TableCell align="center">Horse Power</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cars.map((car, index) => (
                        <TableRow key={index} onClick={() => deleteCarHandler(car.id)}>
                            <TableCell>{car.brand}</TableCell>
                            <TableCell align="center">{car.model}</TableCell>
                            <TableCell align="center">{car.year}</TableCell>
                            <TableCell align="center">{car.horsePower}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>
    );
}

export default App;
