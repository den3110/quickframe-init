import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BetAccountRightSideContent from './BetAccountRightSideContent';

const BetAccountRightSideModal = ({isOpen, setIsOpen}) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setIsOpen(open);
    };

    return (
        <>
          <Drawer
            anchor={isMobile ? 'bottom' : 'right'}
            open={isOpen}
            onClose={toggleDrawer(false)}
            PaperProps={{
              sx: {
                maxWidth: isMobile ? 'auto' : '450px',
                maxHeight: isMobile ? 'calc(100vh - 120px)' : 'auto',
                ...(isMobile && { borderRadius: '16px 16px 0 0' }) // Optional: for rounded corners on mobile
              }
            }}
          >
         <IconButton
          onClick={toggleDrawer(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            zIndex: 1300 // ensure it's above the drawer content
          }}
        >
          <CloseIcon />
        </IconButton>
        
        <BetAccountRightSideContent isMobile={isMobile} setIsOpen={setIsOpen} />
          </Drawer>
        </>
      );
    };

export default BetAccountRightSideModal;
