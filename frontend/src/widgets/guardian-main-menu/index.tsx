import { useState } from 'react';
import {Accordion, AccordionSummary, AccordionDetails, Typography, styled} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRoute } from 'react-router5';
import cn from 'classnames';
import styles from './index.module.scss';
import { queries } from 'src/api';
import { ItemInfo } from './components';
import {
    StarPurple500Outlined,
    CategoryOutlined,
    AutoDeleteOutlined,
    AssignmentIndOutlined,
    CreditCardOutlined,
    BadgeOutlined,
    DescriptionOutlined,
    Lock,
    Send,
    Add
} from '@mui/icons-material';
import Button from '@mui/material/Button';

const StyledAccordionDetails = styled(AccordionDetails)`
    padding: 0px 0px 16px;`;
const StyledLeftButton = styled(Button)`
    padding: 6px 11px;
    margin-top: 10px;
    margin-left: 7px;
    margin-bottom: 10px;`;
const StyledRightButton = styled(Button)`
    width: 95%;
    height: 37.95px;
`;

export const GuardianMainMenu = () => {
    const { route } = useRoute();
    const [expanded, setExpanded] = useState(true);
    // TODO
    const handleChangePath = (newData: string) => () => {
        console.log(newData);
        // setRoute or similar logic here
    };

    const ITEMS = [
        { icon: <StarPurple500Outlined />, label: 'All items', path: 'allItems', visible: true },
        { icon: <CategoryOutlined />, label: 'Favorites', path: 'favorites', visible: true },
        { icon: <AutoDeleteOutlined />, label: 'Trash', path: 'trash', visible: true },
        { label: 'Types', children: [
                { icon: <AssignmentIndOutlined />, label: 'Login', path: 'login', visible: true },
                { icon: <CreditCardOutlined />, label: 'Card', path: 'card', visible: true },
                { icon: <BadgeOutlined />, label: 'Identity', path: 'identity', visible: true },
                { icon: <DescriptionOutlined />, label: 'Secure note', path: 'secureNote', visible: true },
            ]
        },
    ];

    const { data } = queries.guardian.useGetAllAccounts();

    // TODO
    let selectedType: string = 'allItems';
    // TODO
    const filteredData = data.filter(item => selectedType === selectedType);

    function setSelectedType(path: string) {
        console.log(path);
    }

    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <div className={styles.navigation}>
                    {ITEMS.map(item => (
                        item.children ? (
                            <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>{item.label}</Typography>
                                </AccordionSummary>
                                <StyledAccordionDetails>
                                    {item.children.map(subItem => (
                                        <Typography
                                            key={subItem.path}
                                            className={cn(styles.item, { [styles.item_active]: selectedType === subItem.path })}
                                            onClick={() => setSelectedType(subItem.path)}
                                        >
                                            <div className={styles.iconWrapper}>{subItem.icon}</div>
                                            <div className={styles.title}>{subItem.label}</div>
                                        </Typography>
                                    ))}
                                </StyledAccordionDetails>
                            </Accordion>
                        ) : (
                            <Typography
                                key={item.path}
                                className={cn(styles.item, { [styles.item_active]: selectedType === item.path })}
                                onClick={() => setSelectedType(item.path)}
                            >
                                <div className={styles.iconWrapper}>{item.icon}</div>
                                <div className={styles.title}>{item.label}</div>
                            </Typography>
                        )
                    ))}
                </div>
                <div className={styles.elements}>
                    {filteredData.map(item => (
                        <ItemInfo key={item.id} account={item.user_name} id={item.id} img={item.icon_link} name={item.name} />
                    ))}
                </div>
                <div className={styles.footer}>
                    <StyledLeftButton startIcon={<Lock />} className={styles.footer} variant="outlined">My Vault</StyledLeftButton>
                    <StyledLeftButton startIcon={<Send />} className={styles.footer} variant="outlined">Send</StyledLeftButton>
                </div>
                <div className={styles.footer}>
                    <StyledRightButton startIcon={<Add />} className={styles.footer} variant="outlined"></StyledRightButton>
                </div>
            </div>
        </div>
    );
};