import React, { useEffect } from "react";
import { IconButton, Checkbox, Button, Tooltip, useTheme } from "@mui/material";
import {
  Grid,
  Box,
  TextField,
  InputAdornment,
  useMediaQuery,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useLoginForm } from "../../form/auth/login/useLoginForm";
import { useNavigate } from "react-router-dom";
import Bear from "../../assets/bull--.png";
import { useTranslation } from "react-i18next";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import CaptchaLogin from "./CaptchaLogin";
 
const LoginPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    formik,
    showValues,
    loading,
    handleClickShowPassword,
    handleMouseDownPassword,
    isError,
  } = useLoginForm();
 
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter" && !loading) {
        event.preventDefault(); // Prevent the default form submission
        formik.handleSubmit();
      }
    };
 
    document.addEventListener("keypress", handleKeyPress);
 
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [formik, loading]);
  const handleClick = () => {
    navigate("/register");
  };
  const mode = useSelector((state) => state?.theme?.mode);
  const handleTrimmedChange = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value.trim());
  };
  return (
    <Box
      className="paddingOuter"
      padding={{ xs: "20px", sm: "16px 22px 96px 22px" }}
      boxShadow="0 4px 8px 3px rgba(0,0,0,.15), 0 1px 3px rgba(0,0,0,.3)"
      width={{ xs: "90%", sm: "80%" }}
      bgcolor="#fdf8fd"
      borderRadius="32px"
      position="relative"
      alignSelf="center"
      marginTop={isMobile && "180px"}
    >
      <img
        src={Bear}
        alt="bear--.png"
        style={{
          position: "absolute",
          left: isMobile ? "200px" : "140px",
          top: isMobile ? "20px" : "80px",
        }}
      />
      <Grid padding={{ sm: "2rem", xs: "1" }} className="paddingOuterLayer">
        <Grid display="flex" justifyContent="space-between">
          <Grid
            display="flex"
            flexDirection="column"
            alignItems="start"
            paddingBottom={isMobile ? "1rem" : "2.5rem"}
          >
            <div
              style={{ color: "#875923", fontSize: isMobile && "24px" }}
              className="displayLarge"
            >
              {t("Log In")}
            </div>
            <div
              className="titleMedium"
              style={{ color: "black", fontSize: isMobile && "14px" }}
            >
              {t("Your account to continue")}
            </div>
          </Grid>
          <Grid display="flex" height={"2rem"}>
            <Tooltip title="Adult Account">
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px",
                  borderRight: !formik.values.isMinor ? "1px solid grey" : "",
                  borderRadius: "12px 0px 0 12px",
                  backgroundColor: !formik.values.isMinor
                    ? "#ddd1f1"
                    : "transparent",
                }}
                onClick={() => {
                  formik.setFieldValue("isMinor", false);
                }}
              >
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_6396_51051)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.43641 6.1092C9.5055 6.1092 9.57303 6.12936 9.63048 6.16713C9.68793 6.2049 9.7327 6.25859 9.75914 6.3214C9.78558 6.38421 9.79249 6.45333 9.77902 6.52001C9.76554 6.58669 9.73227 6.64794 9.68341 6.69601C9.63456 6.74409 9.57232 6.77683 9.50456 6.79009C9.43679 6.80335 9.36656 6.79655 9.30273 6.77053C9.2389 6.74451 9.18434 6.70045 9.14596 6.64392C9.10757 6.58739 9.08708 6.52093 9.08708 6.45295C9.08708 6.36178 9.12389 6.27434 9.1894 6.20988C9.25491 6.14541 9.34376 6.1092 9.43641 6.1092ZM9.89026 9.73029C10.4301 9.23159 10.8284 8.8631 10.7517 7.96727C10.7484 7.92133 10.7605 7.8756 10.7861 7.83706C10.8014 7.81436 10.8211 7.79486 10.8442 7.77969C10.8672 7.76451 10.893 7.75396 10.9202 7.74864C10.9473 7.74332 10.9753 7.74332 11.0025 7.74867C11.0297 7.75401 11.0555 7.76458 11.0785 7.77977C11.113 7.80223 11.1498 7.82099 11.1883 7.83576C11.218 7.8472 11.2492 7.85422 11.2809 7.85659C11.3113 7.85992 11.3419 7.85992 11.3722 7.85659C11.3893 7.82611 11.4026 7.79377 11.4119 7.76024L11.6766 7.01284C11.7242 6.83576 11.7533 6.63784 11.5125 6.65607C11.3756 6.67228 11.246 6.72546 11.138 6.80972C11.1148 6.82744 11.0882 6.84029 11.0597 6.84745C11.0313 6.85462 11.0016 6.85596 10.9726 6.85138C10.9453 6.84682 10.9192 6.83699 10.8958 6.82246C10.8723 6.80794 10.852 6.789 10.8361 6.76674C10.8201 6.74448 10.8087 6.71934 10.8026 6.69275C10.7966 6.66616 10.7959 6.63865 10.8006 6.6118C10.9991 5.47248 10.9078 4.72899 10.6683 4.22248C10.4652 3.82684 10.1369 3.50693 9.7328 3.31102C8.90051 3.93342 8.32096 4.00503 7.73346 4.07534C7.25182 4.13394 6.7715 4.19253 6.13373 4.62612C5.8545 4.8041 5.64141 5.06633 5.52638 5.37352C5.42201 5.70537 5.41331 6.05922 5.50124 6.39565C5.51511 6.43798 5.51511 6.48353 5.50124 6.52586C5.48315 6.57727 5.44533 6.61968 5.39587 6.64401C5.34642 6.66834 5.28926 6.67267 5.23661 6.65607L5.20617 6.64565L5.04342 6.58836C4.79466 6.50242 4.61735 6.45815 4.54987 6.61571C4.51679 6.93341 4.51811 7.65737 4.82245 7.83315C4.85868 7.85351 4.89982 7.86386 4.94153 7.8631C4.99998 7.86297 5.05803 7.85374 5.11355 7.83576C5.1341 7.82912 5.15546 7.82518 5.17706 7.82404C5.23264 7.82299 5.28638 7.84363 5.32654 7.88144C5.36671 7.91926 5.39003 7.97118 5.39142 8.02586C5.41524 8.96466 5.83866 9.32795 6.35338 9.76024C6.43144 9.82664 6.51348 9.89045 6.56773 9.94383C7.54557 10.7993 8.73776 10.8449 9.68252 9.94383L9.90085 9.74071L9.89026 9.73029ZM7.75728 8.16128C7.72647 8.1351 7.70704 8.09828 7.70303 8.05841C7.70137 8.03877 7.70368 8.01899 7.70981 8.00022C7.71594 7.98145 7.72578 7.96406 7.73876 7.94904C7.75183 7.93347 7.76793 7.92062 7.7861 7.91123C7.80427 7.90185 7.82416 7.89611 7.84461 7.89435C7.86458 7.89272 7.88467 7.89499 7.90375 7.90102C7.92282 7.90706 7.9405 7.91674 7.95576 7.92951C8.00024 7.96735 8.05707 7.98818 8.11586 7.98818C8.17466 7.98818 8.23149 7.96735 8.27597 7.92951C8.29165 7.91608 8.30994 7.90592 8.32973 7.89965C8.34951 7.89339 8.37039 7.89114 8.39109 7.89305C8.4305 7.89717 8.46688 7.91577 8.49297 7.94513H8.49959C8.52333 7.97608 8.53464 8.01456 8.53135 8.05321C8.52712 8.0933 8.50719 8.1302 8.47577 8.15607C8.37581 8.23956 8.24896 8.2854 8.11785 8.2854C7.98673 8.2854 7.85988 8.23956 7.75993 8.15607L7.75728 8.16128ZM3.54425 2.84878C5.67458 0.266748 8.11586 -1.1369 9.95377 1.15998C12.1688 1.27456 13.0567 4.7368 11.2902 6.19383C11.2902 6.22248 11.2902 6.25112 11.2796 6.27977C11.3464 6.25962 11.4151 6.24652 11.4847 6.24071C11.6092 6.22923 11.7344 6.25271 11.8459 6.30841C11.9061 6.33957 11.9593 6.38222 12.0024 6.43387C12.0456 6.48552 12.0779 6.54512 12.0973 6.6092C12.1449 6.78025 12.1408 6.96126 12.0854 7.13003C12.0858 7.13697 12.0858 7.14392 12.0854 7.15086L11.8208 7.90086C11.7879 8.01113 11.7208 8.10854 11.6289 8.17951C11.5204 8.25555 11.3864 8.28771 11.2545 8.26935L11.1777 8.26024C11.1658 9.1144 10.7397 9.51414 10.1814 10.0259C10.618 11.4855 11.6752 11.7186 12.7047 11.9321C14.1178 12.2355 16.1172 12.2746 16.1172 15.1131V15.7928C16.1172 15.8477 16.095 15.9004 16.0556 15.9392C16.0161 15.978 15.9626 15.9998 15.9068 15.9998H0.327575C0.271776 15.9998 0.218264 15.978 0.178808 15.9392C0.139353 15.9004 0.117188 15.8477 0.117188 15.7928V15.1795C0.117188 12.2121 2.21047 12.2511 3.70303 12.0311C4.77878 11.8722 5.87438 11.7108 6.30045 10.2602C6.22238 10.1938 6.14564 10.13 6.06624 10.0597C5.51977 9.59618 5.06194 9.20815 4.97461 8.26284H4.92566C4.81295 8.26298 4.70214 8.23426 4.60412 8.17951C4.44269 8.07971 4.31832 7.93129 4.24951 7.75633C4.16606 7.55395 4.11819 7.33908 4.10792 7.12091C4.10792 7.05451 4.10792 6.923 4.10792 6.7967C4.10878 6.70532 4.11452 6.61404 4.12513 6.52326C4.12688 6.50619 4.13135 6.48949 4.13836 6.47378C4.25348 6.15868 4.42946 6.05711 4.6597 6.06362L4.50753 5.96336C4.42549 4.94774 4.66763 3.18341 3.54425 2.84878ZM6.75166 10.6483C6.71333 10.6264 6.67622 10.6025 6.64051 10.5766C6.35338 11.3944 5.87835 11.8214 5.31732 12.0688C6.17328 12.5795 7.16171 12.8342 8.16218 12.8019C9.20199 12.7852 10.2101 12.4472 11.0441 11.8358C10.5519 11.5623 10.1298 11.1326 9.85321 10.3852C9.02357 11.1313 7.69906 11.2199 6.74769 10.6457L6.75166 10.6483ZM6.79664 6.1092C6.86573 6.1092 6.93327 6.12936 6.99072 6.16713C7.04816 6.2049 7.09294 6.25859 7.11938 6.3214C7.14582 6.38421 7.15273 6.45333 7.13925 6.52001C7.12578 6.58669 7.09251 6.64794 7.04365 6.69601C6.9948 6.74409 6.93256 6.77683 6.86479 6.79009C6.79703 6.80335 6.7268 6.79655 6.66296 6.77053C6.59913 6.74451 6.54458 6.70045 6.50619 6.64392C6.46781 6.58739 6.44732 6.52093 6.44732 6.45295C6.44732 6.36178 6.48413 6.27434 6.54964 6.20988C6.61515 6.14541 6.704 6.1092 6.79664 6.1092ZM6.98454 8.67039H9.11487C9.31203 8.66258 9.36363 8.76545 9.29747 8.90737C8.72718 10.173 6.84957 9.5493 6.82443 8.89045C6.82443 8.79279 6.87207 8.67821 6.98321 8.67039H6.98454ZM10.2303 5.93602C10.2426 5.95166 10.2516 5.96953 10.2568 5.9886C10.262 6.00767 10.2634 6.02756 10.2608 6.04715C10.2582 6.06674 10.2518 6.08563 10.2418 6.10276C10.2318 6.11988 10.2184 6.1349 10.2025 6.14696C10.1866 6.15901 10.1685 6.16787 10.1491 6.17302C10.1297 6.17817 10.1095 6.17951 10.0896 6.17697C10.0697 6.17443 10.0505 6.16806 10.0331 6.15822C10.0157 6.14838 10.0004 6.13526 9.98818 6.11961C9.89696 5.98408 9.75865 5.88594 9.59916 5.84357C9.44874 5.81558 9.29336 5.82956 9.1506 5.88394C9.13157 5.89018 9.11148 5.89267 9.09148 5.89127C9.07147 5.88987 9.05194 5.88461 9.034 5.87578C9.01606 5.86696 9.00006 5.85474 8.98692 5.83983C8.97378 5.82492 8.96375 5.80761 8.95741 5.78888C8.95107 5.77016 8.94854 5.75039 8.94996 5.7307C8.95138 5.71102 8.95673 5.6918 8.9657 5.67415C8.97467 5.65649 8.98708 5.64075 9.00223 5.62782C9.01739 5.61489 9.03498 5.60502 9.054 5.59878C9.52771 5.44123 9.92466 5.53888 10.2303 5.93862V5.93602ZM7.18037 5.59878C7.19922 5.60494 7.21666 5.61468 7.23168 5.62747C7.24671 5.64026 7.25903 5.65583 7.26793 5.6733C7.27684 5.69077 7.28217 5.7098 7.2836 5.7293C7.28504 5.74879 7.28256 5.76838 7.2763 5.78693C7.27005 5.80548 7.26014 5.82264 7.24714 5.83743C7.23415 5.85221 7.21832 5.86433 7.20057 5.8731C7.18281 5.88186 7.16348 5.8871 7.14367 5.88852C7.12385 5.88993 7.10395 5.88749 7.0851 5.88133C6.94194 5.82659 6.78591 5.81304 6.63522 5.84227C6.47584 5.88562 6.33771 5.98409 6.2462 6.11961C6.22216 6.15121 6.18635 6.17212 6.14665 6.17773C6.10694 6.18335 6.0666 6.17322 6.03449 6.14956C6.00238 6.12591 5.98113 6.09067 5.97542 6.0516C5.96972 6.01253 5.98002 5.97283 6.00406 5.94123C6.30971 5.53888 6.70931 5.44383 7.18037 5.60138V5.59878ZM7.14861 8.86961H9.00108C8.85156 9.30972 7.31798 9.3006 7.14861 8.86961Z"
                      fill={!formik.values.isMinor ? "#141316" : "#7A757F"}
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6396_51051">
                      <rect
                        width="16"
                        height="16"
                        fill="white"
                        transform="translate(0.117188)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </Grid>{" "}
            </Tooltip>
            <Tooltip title="Minor Account">
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  gap: "8px",
                  borderLeft: formik.values.isMinor ? "1px solid grey" : "",
                  borderRadius: "0px 12px 12px 0px",
                  backgroundColor: formik.values.isMinor
                    ? "#ddd1f1"
                    : "transparent",
                  padding: "10px",
                }}
                onClick={() => {
                  formik.setFieldValue("isMinor", true);
                }}
              >
                <svg
                  width="25"
                  height="16"
                  viewBox="0 0 25 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.117188 15.5452C0.117188 10.1756 5.18713 13.1479 5.57588 9.85567C5.6184 9.49729 4.77206 8.13059 4.57971 7.47458C4.16464 6.81249 4.01684 5.76367 4.47038 5.06514C4.65058 4.78775 4.57364 3.77538 4.57364 3.3927C4.57364 2.31149 5.08387 1.69192 5.77431 1.11487C6.0274 0.904297 6.06992 0.651204 6.43842 0.562116C8.25866 0.122747 11.2371 1.12297 11.2371 3.39473C11.2371 3.87661 11.1257 4.7594 11.3869 5.13803C11.64 5.5045 11.6704 6.03701 11.5792 6.5351C11.48 6.61204 11.3828 6.69505 11.2857 6.78009C11.069 6.97244 10.8524 7.18504 10.6398 7.41788C10.6296 7.42598 10.6215 7.43611 10.6114 7.4442L10.6094 7.44623C10.5082 7.54747 10.4292 7.67705 10.3907 7.82688C10.3057 8.14476 10.413 8.46872 10.6418 8.67322C10.3725 9.17333 10.1315 9.64915 10.1741 9.85769C10.2409 10.1958 10.492 10.5076 10.8503 10.7931V10.7992C10.8503 10.8174 10.8524 10.8356 10.8544 10.8518C10.8665 10.9754 10.8868 11.0928 10.9151 11.1981C10.9475 11.3155 10.99 11.4309 11.0447 11.5382C11.1399 11.7265 11.2674 11.8905 11.4294 12.0201C11.5104 12.0849 11.5995 12.1416 11.6926 12.1861C11.7169 12.2145 11.7412 12.2428 11.7655 12.2692L11.806 12.3178C11.065 12.4595 10.5507 12.5931 10.1174 13.0224C9.63751 13.4982 9.45529 14.1663 9.45529 15.3711C9.45529 15.4318 9.46136 15.4905 9.46946 15.5472L0.117188 15.5452ZM15.7138 6.3468C16.6249 0.973138 21.8771 1.1007 22.6667 6.7315C23.185 10.4388 25.4082 10.3052 21.9378 10.3052H20.5529C20.5468 11.2487 20.401 11.7306 21.379 12.2611C22.3569 12.7895 24.9972 13.0629 24.9972 14.4032V15.2617C24.9972 15.3306 24.9405 15.3873 24.8717 15.3873H18.7833V15.369C18.7833 14.1643 18.599 13.4941 18.1191 13.0203C17.7405 12.6458 17.3012 12.498 16.7018 12.3704C16.8213 12.3157 16.9326 12.257 17.0379 12.1942C17.8984 11.6779 17.7527 11.1596 17.7466 10.3052H17.372C17.3659 10.2606 17.3578 10.2201 17.3497 10.1796H17.3477C17.3072 9.99133 17.2404 9.8091 17.1432 9.64712C17.127 9.61877 17.1088 9.59043 17.0906 9.56411V9.43857C17.206 9.01135 17.2364 8.53959 17.1614 8.10224C17.0784 7.61023 16.8638 7.14859 16.4994 6.80641C16.3111 6.62823 16.1005 6.49663 15.8717 6.40551C15.8211 6.38122 15.7684 6.36299 15.7138 6.3468ZM11.2087 8.03948C12.5106 6.60191 14.015 5.82239 15.1408 7.1C15.4364 7.11417 15.7016 7.21136 15.9223 7.41991C16.386 7.85523 16.4589 8.6712 16.2463 9.31911V9.88402C16.39 9.97918 16.4832 10.1553 16.5237 10.3558C16.552 10.4854 16.5581 10.6291 16.5439 10.7648C16.5297 10.9065 16.4953 11.0422 16.4386 11.1535C16.3576 11.3135 16.2361 11.4248 16.0701 11.4491C15.9081 11.6233 15.7482 11.8075 15.6064 11.9857C15.4505 12.1821 15.3169 12.3663 15.2258 12.5202C15.1549 12.6377 15.1772 12.7146 15.2035 12.8017C15.2157 12.8462 15.2298 12.8908 15.2379 12.9393C15.5234 13.0001 15.7806 13.0487 16.0114 13.0932C17.4793 13.3686 17.9369 13.4536 17.9369 15.365C17.9369 15.4622 17.858 15.5411 17.7608 15.5411H10.4778C10.3806 15.5411 10.3016 15.4622 10.3016 15.365C10.3016 13.4536 10.7572 13.3686 12.2272 13.0932C12.46 13.0487 12.7212 13.0001 13.0067 12.9393C13.0168 12.9009 13.029 12.8665 13.0411 12.83C13.0715 12.747 13.0998 12.662 13.0128 12.5202C12.9196 12.3684 12.786 12.1821 12.6321 11.9857C12.4904 11.8075 12.3304 11.6212 12.1684 11.4491C12.0024 11.4248 11.8789 11.3135 11.7999 11.1535C11.7432 11.0442 11.7088 10.9065 11.6946 10.7648C11.6825 10.6291 11.6886 10.4854 11.7149 10.3558C11.7574 10.1553 11.8485 9.97918 11.9903 9.88402L11.7999 9.77063C11.7473 9.20978 11.8971 8.22778 11.2087 8.03948Z"
                    fill={formik.values.isMinor ? "#141316" : "#7A757F"}
                  />
                </svg>
              </Grid>
            </Tooltip>{" "}
          </Grid>
        </Grid>
        <Grid
          component="form"
          noValidate
          sx={{
            mt: isMobile ? 0 : 1,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <TextField
            required
            value={formik.values.email}
            onChange={handleTrimmedChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            name="email"
            label={t("Email")}
            fullWidth
            variant="outlined"
            type="text"
            sx={{
              background: mode === "dark" ? theme.palette.surface[300] : "",
              borderRadius: mode === "dark" ? "4px" : "",
              "& label": {
                color: mode === "dark" ? theme.palette.primary[900] : "",
              },
              "& input": {
                borderRight: mode === "dark" ? "1px solid #adb5bd" : "", // Add border to input
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <MailOutlineIcon
                    style={{ color: theme.palette.primary[900] }}
                  />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            variant="outlined"
            label={t("Password")}
            name="password"
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            onKeyPress={(ev) => {
              if (ev.key === "Enter") {
                formik.handleSubmit();
                ev.preventDefault();
              }
            }}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            type={showValues.showPassword ? "text" : "password"}
            inputProps={{
              maxLength: 15, // Limit input to 15 characters
            }}
            sx={{
              minWidth: "10vw",
              mt: 1,
              background: mode === "dark" ? theme.palette.surface[300] : "",
              borderRadius: mode === "dark" ? "4px" : "",
              "& label": {
                color: mode === "dark" ? theme.palette.primary[900] : "",
              },
              "& input": {
                borderRight: mode === "dark" ? "1px solid #adb5bd" : "", // Add border to input
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title={`${
                      showValues.showPassword ? "Hide" : "Show"
                    } Password`}
                  >
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showValues.showPassword ? (
                        <VisibilityOff
                          style={{ color: theme.palette.primary[900] }}
                        />
                      ) : (
                        <Visibility
                          style={{ color: theme.palette.primary[900] }}
                        />
                      )}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
          {formik.values.isMinor && (
            <TextField
              required
              value={formik.values.referenceNo}
              onChange={formik.handleChange}
              error={
                formik.touched.referenceNo && Boolean(formik.errors.referenceNo)
              }
              helperText={
                formik.touched.referenceNo && formik.errors.referenceNo
              }
              name="referenceNo"
              label={t("Reference No")}
              fullWidth
              variant="outlined"
              type="text"
              sx={{
                background: mode === "dark" ? theme.palette.surface[300] : "",
                borderRadius: mode === "dark" ? "4px" : "",
                "& label": {
                  color: mode === "dark" ? theme.palette.primary[900] : "",
                },
                "& input": {
                  borderRight: mode === "dark" ? "1px solid #adb5bd" : "", // Add border to input
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FamilyRestroomIcon
                      style={{ color: theme.palette.primary[900] }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          )}
 
          <CaptchaLogin formik={formik} t={t} mode={mode} isError={isError} />
          <Grid container sx={{ display: "flex", alignItems: "center" }}>
            <Grid item md={6} xs={12}>
              <FormControl component="fieldset">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="rememberMe"
                      // sx={{ padding: "0" }}
                      checked={formik.values.rememberMe}
                      onChange={formik.handleChange}
                    />
                  }
                  label={
                    <div style={{ fontSize: "12px" }}>{t("Remember me")}</div>
                  }
                />
              </FormControl>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <div
                className="bodySmall"
                onClick={() => navigate("/reset/password")}
                style={{ color: theme.palette.primary[500], cursor: "pointer" }}
              >
                {t("Forgot Password?")}
              </div>
            </Grid>
          </Grid>
          <Button
            className="titleMedium "
            fullWidth
            onClick={() => formik.submitForm()}
            variant="contained"
            loading={loading}
            color="primary"
            sx={{
              bgcolor: theme.palette.primary.main,
            }}
          >
            <div
              className="titleMedium "
              style={{ margin: isMobile ? "0" : ".25rem 0" }}
            >
              {t("Login")}
            </div>
          </Button>
        </Grid>
        <Grid sx={{ textAlign: "center" }} marginTop=".5rem">
          <div className="bodySmall ">
            {t("Don't have an account?")}
            {"   "}
            <span
              className="labelMedium"
              style={{ color: theme.palette.primary[500], cursor: "pointer" }}
              onClick={handleClick}
            >
              {t("Sign Up")}
            </span>
          </div>
        </Grid>
      </Grid>
      <style>
        {`.css-1h9uykw-MuiInputBase-input-MuiOutlinedInput-input:-webkit-autofill, .css-1h9uykw-MuiInputBase-input-MuiOutlinedInput-input {
              -webkit-box-shadow: 0 0 0 100px ${theme.palette.surface[300]} inset;
              -webkit-text-fill-color: ${theme.palette.primary[900]} !important;
          }`}
      </style>
    </Box>
  );
};
 
export default LoginPage;