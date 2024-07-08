import { useTheme } from "@emotion/react";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "utils/axios";
import BetAccountRightSideModal from "./modal/BetAccountRightSide";
import { numberFormat } from "utils/numberFormat";
import { WalletTypeContext } from "contexts/walletTypeContext";

function BetAccountType(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  const [isOpenModal, setOpenModal] = useState(false);

  const { state: walletState, dispatch } = useContext(WalletTypeContext);

  const loadSpotBalance = async()=> {
    try {
      const {data} = await axiosInstance.get("/api/exchange/spot-balance");
      if (data.ok) {
        dispatch({
          type: "SET_SPOT_BALANCE",
          payload: data.d,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadSpotBalance();
  }, []);

  return (
    <>
      <BetAccountRightSideModal isOpen={isOpenModal} setIsOpen={setOpenModal} />
      <div
        role="none"
        {...props}
        onClick={() => {
          setOpenModal(!isOpenModal);
        }}
      >
        <div
          className="MuiBox-root jss322 sc-dhaItB ctWyIh top-wallet"
          style={{
            color: isLight ? "rgb(17, 24, 39)" : "rgb(250, 250, 250)",
            display: "flex",
            WebkitBoxAlign: "center",
            alignItems: "center",
            cursor: "pointer",
            gap: 8,
          }}
        >
          <svg
            className="icon"
            style={{ width: "16px" }}
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M22 12v5c0 3-2 5-5 5H7c-3 0-5-2-5-5v-5c0-2.72 1.64-4.62 4.19-4.94.26-.04.53-.06.81-.06h10c.26 0 .51.01.75.05C20.33 7.35 22 9.26 22 12Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.751 7.05c-.24-.04-.49-.05-.75-.05h-10c-.28 0-.55.02-.81.06.14-.28.34-.54.58-.78l3.25-3.26a3.525 3.525 0 0 1 4.96 0l1.75 1.77c.64.63.98 1.43 1.02 2.26ZM22 12.5h-3c-1.1 0-2 .9-2 2s.9 2 2 2h3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="MuiBox-root jss323">
            <div
              className="sc-ibsmuj bUlrXZ"
              style={{
                fontWeight: 600,
                fontSize: 12,
                lineHeight: "120%",
                color: isLight ? "rgb(17, 24, 39)" : "rgb(250, 250, 250)",
                display: "flex",
                WebkitBoxAlign: "center",
                alignItems: "center",
                gap: 4,
              }}
            >
              {walletState.type === "LIVE"
                ? numberFormat(walletState.spotBalance?.availableBalance)
                : numberFormat(walletState.spotBalance?.demoBalance)}
            </div>

            <small
              className="sc-EdmDu jcyFTh"
              style={{
                fontWeight: "500",
                fontSize: "10px",
                lineHeight: "160%",
                display: "flex",
                WebkitBoxAlign: "center",
                alignItems: "center",
                color: "rgb(113, 128, 150)",
              }}
            >
              {t(`account_type_${walletState.type}`)}
            </small>
          </div>
          <svg
            className="icon-down"
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              stroke="#989A9C"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit={10}
              strokeWidth="1.5"
              d="M19.92 8.95l-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
            />
          </svg>
        </div>
      </div>
    </>
  );
}

export default BetAccountType;
