import React, { useContext, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import useAuth from 'hooks/useAuth';
import { numberFormat } from 'utils/numberFormat';
import { useTranslation } from 'react-i18next';
import { WalletTypeContext } from 'contexts/walletTypeContext';

const StyledWrapper = styled(Box)({
    position: 'relative',
    background: 'linear-gradient(112.77deg, rgb(0, 43, 22) 14.65%, rgb(84, 206, 147) 87.93%)',
    padding: '16px 24px',
    borderRadius: '16px',
});

const StyledImage = styled('img')({
    height: '24px',
    padding: '4px 12px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '17px',
    marginBottom: '14px',
});


const StyledText = styled(Typography)({
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '150%',
    letterSpacing: '0.306388px',
    color: 'rgb(255, 255, 255)',
});

const StyledSubText = styled(Typography)({
    fontWeight: 500,
    fontSize: '10px',
    lineHeight: '160%',
    color: 'rgb(255, 255, 255)',
    opacity: 0.3,
});

const Separator = styled(Box)({
    margin: '12px 0px',
    opacity: 0.2,
    border: '1.11194px solid rgba(255, 255, 255, 0.2)',
});



function CardAccountLive() {
    const { user } = useAuth();
    const { t } = useTranslation();
    const { state } = useContext(WalletTypeContext);

    return (
        <StyledWrapper>
            <StyledImage src={`/assets/exchange/${user?.exchange_clientId?.toUpperCase()}.svg`} />
            <Box>
                <StyledText>{user?.exchange_email}</StyledText>
                <StyledSubText>{t('email_account')}</StyledSubText>
            </Box>
            <Separator />
            <Grid container spacing={5}>
                <Grid item xs={6} md={6}>
                    <Box>
                        <StyledText>{numberFormat(state.spotBalance?.usdtAvailableBalance)}</StyledText>
                        <StyledSubText>{t('usdt_wallet')}</StyledSubText>
                    </Box>
                </Grid>
                <Grid item xs={6} md={6}>
                    <Box>
                        <StyledText>{numberFormat(state.spotBalance?.availableBalance)}</StyledText>
                        <StyledSubText>{t('live_wallet')}</StyledSubText>
                    </Box>
                </Grid>
            </Grid>
        </StyledWrapper>
    );
}

export default CardAccountLive;
