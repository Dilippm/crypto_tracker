import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom" 
import axios from "axios";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { Container, createTheme, LinearProgress, Table, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography,TableCell, TableBody, Pagination, PaginationItem } from "@mui/material";
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
const CoinsTable = () => {
    const navigate = useNavigate()
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const  [page,setPage] =useState(1)
  const { currency,symbol } = CryptoState();
  const fetchCoins = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); 
    }
  };
  
  console.log(coins);
  useEffect(() => {
    fetchCoins();
  }, [currency]);
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });
  const handleSearch = () => {
    return coins.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };
  
  return <ThemeProvider theme={darkTheme}>
    <Container sx={{textAlign:"center"}}>
            <Typography
            variant="h4"
            sx={{margin:18, fontFamily:"Montserrat"}}>
                Crypto Prices by Market Cap
            </Typography>
            <TextField 
              label="Search for a crypto currency..." 
              variant="outlined"
              sx={{marginBottom:20,width:"100%"}}
              onChange={(e)=> setSearch(e.target.value)}
              />

<TableContainer>
{loading ? (
 
  <LinearProgress style={{ backgroundColor: "gold" }} />
) : (
 
  <Table>
        <TableHead sx={{backgroundColor:"#EEBC1D"}}>
        <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>

        </TableHead>
        <TableBody>
  {handleSearch()
  .slice((page-1)*10, (page-1)* 10 +10)
  .map((row) => {
    const profit = row.price_change_percentage_24h > 0;
    return (
      <TableRow
        onClick={() => navigate(`/coins/${row.id}`)} // Use onClick with a capital "C"
        key={row.name}
        sx={{
          backgroundColor: "#16171a",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#131111",
          },
          fontFamily: "Montserrat",
        }}
      >
        <TableCell component="th" scope="row" sx={{ display: "flex", gap: "15" }}>
          <img
            src={row?.image}
            alt={row.name}
            height="50"
            style={{ marginBottom: 10 }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ textTransform: "uppercase", fontSize: 22 }}>
              {row.symbol}
            </span>
            <span style={{ color: "darkgrey" }}>{row.name}</span>
          </div>
        </TableCell>
        <TableCell align="right">
          {symbol} {numberWithCommas(row.current_price.toFixed(2))}
        </TableCell>
        <TableCell
          align="right"
          style={{
            color: profit ? "rgb(14, 203, 129)" : "red",
            fontWeight: 500,
          }}
        >
          {profit && "+"}
          {row.price_change_percentage_24h.toFixed(2)}%
        </TableCell>
        <TableCell align="right">
          {symbol} {numberWithCommas(row.market_cap.toString().slice(0, -6))} M
        </TableCell>
      </TableRow>
    );
  })}
</TableBody>

    </Table>
  )}
</TableContainer>
<Pagination 
    sx={{
        padding:20,
        width:"100%",
        display:"flex",
        justifyContent:"center"
    }}
    count={(handleSearch()?.length/10).toFixed(0)}
    onChange={(_, value) => {
        setPage(value);
        window.scroll(0, 450);
      }}
      renderItem={(item) => (
        <PaginationItem
      {...item}
      sx={{
        "& .MuiPaginationItem-root": {
            color: "gold",
          },
      }}
    />
      )}
/>



    </Container>
  </ThemeProvider>;
};
export default CoinsTable;
