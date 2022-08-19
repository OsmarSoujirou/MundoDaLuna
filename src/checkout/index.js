import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import './Style.css';
import QRCode from 'react-qr-code';
import axios from 'axios';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';

import IconButton from '@mui/material/IconButton';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

import useSound from 'use-sound';

const Checkout = ({ item, back }) => {
  const { title, pts, id, link, qrCode } = item;
  const [cookies, setCookie] = useCookies(['luna']);
  const [checked, setChecked] = useState(false);
  const [metodo, setMetodo] = useState('pix');
  const [loadingLink, setLoadingLink] = useState(true);
  const [itemSalvo, setItemSalvo] = useState(false);
  const [donor, setDonor] = useState({});
  const [phone, setPhone] = useState(cookies?.telefone ? cookies.telefone : '');
  const [playClick] = useSound('/Assets/pop.mp3', { volume: 0.1 });
  const navigate = useNavigate();

  const handleChange2 = (event, newAlignment) => {
    setMetodo(newAlignment);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const copy = async (x) => {
    await navigator.clipboard.writeText(x);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formRef.current.reportValidity()) {
      const data = new FormData(event.currentTarget);
      const pitsN = pts === '??' ? 0 : pts;
      if (pts === '??') setMetodo('pix');
      setDonor({
        id: phone,
        info: {
          nome: data.get('nome'),
          doacoes: [
            {
              dataHora: new Date().toLocaleString(),
              valor: pitsN,
              item: title,
              status: 'pendente',
              recadinho: data.get('recadinho'),
              concorda_termos: data.get('termos'),
              numerosSorte: ['aguardando geração'],
            },
          ],
        },
      });
      setItemSalvo({
        title: title,
        valor: pts,
        id: id,
        link: link,
        qrCode: qrCode,
      });
      if (metodo !== 'pix' && pts !== '??') {
        setTimeout(() => {
          window.open(link, '_blank');
          setLoadingLink(false);
        }, 4500);
      }
      setCookie('nome', data.get('nome'), { path: '/' });
      setCookie('telefone', phone, { path: '/' });
    }
  };

  const saveData = () => {
    axios
      .post(
        '${xxx}',
        { table: 'banco', type: 'record', data: donor },
        {
          headers: { 'x-api-key': '${xxx}' },
        },
      )
      .finally(() => {
        navigate('/?finished');
        navigate(0);
      });
  };
  const formRef = React.useRef();

  return (
    <>
      <nav id="drawer">
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 0 }}
          className={
            !itemSalvo ? 'formChaRifaLuna' : 'formChaRifaLuna activestep'
          }
          ref={formRef}
        >
          <div>
            <IconButton color="secondary" aria-label="Voltar" onClick={back}>
              <ArrowCircleLeftOutlinedIcon color="secondary" />
            </IconButton>
          </div>
          <div>
            <Divider flexItem orientation="horizontal">
              <Chip
                label="Suas informações"
                variant="outlined"
                color="secondary"
                icon={<PersonAddIcon />}
              />
            </Divider>
          </div>
          <div className="itemContainerBox">
            <div className="itemContainerBox">
              <TextField
                required
                inputProps={{ style: { fontSize: '0.9rem' } }}
                InputLabelProps={{ style: { fontSize: '0.9rem' } }}
                size="small"
                sx={{ m: 0, mt: 1 }}
                color="secondary"
                margin="normal"
                fullWidth
                id="Nome"
                value={cookies?.nome}
                label="Nome"
                name="nome"
                autoComplete="nome"
              />
            </div>
            <div className="itemContainerBox">
              <InputMask
                mask="(99) 9 9999-9999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={false}
              >
                <TextField
                  type="tel"
                  inputProps={{ style: { fontSize: '0.9rem' } }}
                  InputLabelProps={{ style: { fontSize: '0.9rem' } }}
                  size="small"
                  sx={{ m: 0, mt: 2 }}
                  color="secondary"
                  margin="normal"
                  required
                  fullWidth
                  id="contato"
                  label="Contato"
                  name="contato"
                />
              </InputMask>
            </div>
            <div className="itemContainerBox">
              <TextField
                inputProps={{ style: { fontSize: '0.9rem' } }}
                InputLabelProps={{ style: { fontSize: '0.9rem' } }}
                size="small"
                sx={{ m: 0, mt: 2 }}
                color="secondary"
                id="outlined-multiline-static"
                label="Recadinho"
                name="recadinho"
                multiline
                rows={3}
                defaultValue=""
              />
            </div>
            <div className="itemContainerBox">
              <TextField
                sx={{ m: 0, mt: 2 }}
                inputProps={{ style: { fontSize: '0.6rem' } }}
                InputLabelProps={{ style: { fontSize: '0.9rem' } }}
                id="outlined-multiline-static"
                label="Termos"
                multiline
                rows={3}
                size="small"
                defaultValue=" 01. O valor arrecadado será utilizado para a compra de produtos da escolha dos responsáveis (mamãe e papai) avaliando a necessidade do bebê, sendo o item de seleção um objeto lúdico.
          02. Todos os participantes que fizerem a doação estarão participando automaticamente do sorteio que ocorrerá no dia 08 de Julho de 2022.
          03. Os números da sorte serão informados a todos os participantes com antecedência ao sorteio. 
          04. Cada ponto será igual a 1 (um) número.
          05. Após o sorteio entraremos em contato com os ganhadores para a entrega dos prêmios.
          06. Os valores doados não serão devolvidos após o sorteio."
                disabled
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="true"
                    color="secondary"
                    name="termos"
                    onChange={handleChange}
                  />
                }
                label={
                  <Typography className="formControlLabel">
                    Eu li e concordo com os termos.
                  </Typography>
                }
              />
            </div>
          </div>
          <div>
            <Divider flexItem orientation="horizontal">
              <Chip
                label="Revisão da contribuição"
                variant="outlined"
                color="secondary"
                icon={<ReceiptIcon />}
              />
            </Divider>
          </div>
          <div className="itemContainerResume">
            <div className="itemContainer">
              <ToggleButtonGroup
                color="secondary"
                value={pts === '??' ? 'pix' : metodo}
                exclusive
                onChange={handleChange2}
                size="small"
                name="metodo"
                fullWidth
                onClick={() => playClick()}
              >
                <ToggleButton value="pix">PIX</ToggleButton>
                <ToggleButton value="mercadoPagoCartao" disabled={pts === '??'}>
                  CARTÃO
                </ToggleButton>
                <ToggleButton value="mercadoPagoBoleto" disabled={pts === '??'}>
                  BOLETO
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div className="itemContainer">
              <div className="itemEsquerda">Item selecionado:</div>
              <div className="itemDireita">
                {pts !== '??' ? title : 'Item Misterioso'}
              </div>
            </div>
            <div className="itemContainer">
              <div className="itemEsquerda">Pontos para sorteio:</div>
              <div className="itemDireita">
                {pts !== '??' ? pts + 'pts' : 'confidencial'}
              </div>
            </div>
            <div className="itemContainer">
              <div className="itemEsquerda">Contribuição:</div>
              <div className="itemDireita">
                {pts !== '??' ? 'R$' + pts + ',00' : 'confidencial'}
              </div>
            </div>
          </div>

          <div className="itemContainer">
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              disabled={!checked}
              type="submit"
              endIcon={<FavoriteIcon />}
              size="large"
              onClick={() => playClick()}
              sx={{ p: 1 }}
            >
              Confirmar
            </Button>
          </div>
          <div></div>
        </Box>

        {itemSalvo && (
          <Box component="div" sx={{ mt: 0 }} className="posCheckout">
            <div>
              <IconButton
                color="secondary"
                aria-label="Voltar"
                onClick={() => setItemSalvo(false)}
              >
                <ArrowCircleLeftOutlinedIcon color="secondary" />
              </IconButton>
            </div>

            {metodo === 'pix' && (
              <section>
                <div>
                  <Divider flexItem orientation="horizontal">
                    <Chip
                      label="Finalize sua contribuição"
                      variant="outlined"
                      color="secondary"
                      icon={<PriceCheckIcon />}
                    />
                  </Divider>
                </div>
                <div>
                  <div className="itemContainer textCenter">
                    <h3>Use o QR Code do Pix</h3>
                  </div>
                  <div className="itemContainer textCenter">
                    <p>
                      Abra o app em que vai fazer a transferência, escaneie a
                      imagem ou cole o código do QR Code
                    </p>
                  </div>
                  <div className="itemContainer textCenter">
                    <div className="qrcode">
                      {itemSalvo.qrCode && (
                        <QRCode id={id} size={200} value={itemSalvo.qrCode} />
                      )}
                    </div>
                  </div>
                  <div className="itemContainer textCenter">
                    <strong>
                      {itemSalvo.valor !== '??'
                        ? 'R$' + itemSalvo.valor + ',00'
                        : 'confidencial'}
                    </strong>
                  </div>
                  <div className="itemContainer">
                    <Button
                      fullWidth
                      variant="outlined"
                      color="secondary"
                      size="small"
                      endIcon={<ContentCopyIcon />}
                      onClick={() => copy(itemSalvo.qrCode)}
                    >
                      Copiar código do QR Code
                    </Button>
                  </div>
                </div>
                <div>
                  <div className="itemContainer textCenter">
                    <p>
                      <strong>Ou use a chave Pix</strong>
                    </p>
                  </div>
                  <div>
                    <div className="itemContainer">
                      <div className="itemEsquerda">Chave Pix:</div>
                      <div className="itemDireita">067.312.573-46</div>
                    </div>
                    <div className="itemContainer">
                      <div className="itemEsquerda">Nome:</div>
                      <div className="itemDireita">
                        OSMAR ARAUJO BORGES JUNIOR
                      </div>
                    </div>
                  </div>
                  <div className="itemContainer textCenter">
                    <Button
                      fullWidth
                      variant="outlined"
                      color="secondary"
                      disabled={!checked}
                      type="submit"
                      endIcon={<PriceCheckIcon />}
                      size="large"
                      onClick={() => {
                        playClick();
                        saveData();
                      }}
                      sx={{ p: 1 }}
                    >
                      Fiz o pagamento
                    </Button>
                  </div>
                </div>
              </section>
            )}

            {metodo !== 'pix' && (
              <section>
                <div>
                  <Divider flexItem orientation="horizontal">
                    <Chip
                      label="Finalize sua contribuição"
                      variant="outlined"
                      color="secondary"
                      icon={<PriceCheckIcon />}
                    />
                  </Divider>
                </div>
                <div>
                  <div className="itemContainer textCenter">
                    <br />
                    <h3>Use o Mercado Pago para concluir seu pagamento</h3>
                  </div>
                  <div className="itemContainer textCenter">
                    <p>
                      Você será direcionado para o Mercado Pago, se sistema não
                      abriu ou se você fechou sem querer a nova guia use o botão
                      abaixo para acessar.
                    </p>
                    <br />
                  </div>
                  <div className="itemContainer">
                    <LoadingButton
                      loading={loadingLink}
                      fullWidth
                      variant="outlined"
                      color="secondary"
                      endIcon={<AddBusinessOutlinedIcon />}
                      onClick={() => window.open(itemSalvo.link, '_blank')}
                    >
                      Mercado Pago
                    </LoadingButton>
                  </div>
                  <div className="itemContainer textCenter">
                    <Button
                      fullWidth
                      variant="outlined"
                      color="secondary"
                      disabled={!checked}
                      type="submit"
                      endIcon={<PriceCheckIcon />}
                      size="large"
                      onClick={() => {
                        playClick();
                        saveData();
                      }}
                      sx={{ p: 1 }}
                    >
                      Fiz o pagamento
                    </Button>
                  </div>
                </div>
                <div></div>
              </section>
            )}

            <div></div>
          </Box>
        )}
      </nav>
    </>
  );
};

export default Checkout;
