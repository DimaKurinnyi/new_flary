import { motion } from 'framer-motion';
import { useState } from 'react';
import { BsTwitterX } from 'react-icons/bs';
import { PiTelegramLogoBold } from 'react-icons/pi';
import { Link, useLocation } from 'react-router-dom';

import { Link as LinkSmooth } from 'react-scroll';
import logo from '../../assets/Flary Logo.png';
import GitBook from '../../assets/GitBook.svg';
import { ModalRules } from '../ModalRules/ModalRules';
import style from './Footer1.module.scss';

export const Footer1 = () => {
  const params = useLocation().pathname.slice(1);
  const [modalPolicyIsOpen, setModalPolicyIsOpen] = useState(false);
  const [modalTermsIsOpen, setModalTermsIsOpen] = useState(false);
  const navLink = [
    { to: 'about', offset: -150, name: 'About Us' },
    { to: 'tekenomics', offset: -150, name: 'Tokenomics' },
    { to: 'roadmap', offset: -200, name: 'Roadmap' },
  ];

  const animation = {
    hidden: {
      y: 75,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  const animation1 = {
    hidden: {
      x: 75,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
  };
  const animation2 = {
    hidden: {
      x: -75,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
  };
  return (
    <div className={style.Footer}>
      <div className={style.top}>
        <motion.div
          className={style.left}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animation2}
          transition={{ duration: '1' }}>
          <img src={logo} alt="Logo" />
          <p>Enter Flary, a game-changer in the world of DeFI.</p>
        </motion.div>
        <motion.div
          className={style.right}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}>
          <div className={style.nav}>
            <motion.p variants={animation} transition={{ duration: '1' }}>
              Navigation
            </motion.p>
            {params === '' ? (
              <ul>
                <motion.li variants={animation1} transition={{ duration: '1', delay: 0.25 }}>
                  <Link
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                      });
                    }}
                    to="/">
                    Home
                  </Link>
                </motion.li>
                {navLink.map((item, i) => (
                  <motion.li
                    key={item.name}
                    variants={animation1}
                    transition={{ duration: '1', delay: 0.5 + i }}>
                    <LinkSmooth to={item.to} offset={item.offset} smooth={true} duration={500}>
                      {item.name}
                    </LinkSmooth>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <ul>
                <motion.li variants={animation1} transition={{ duration: '1', delay: 0.25 }}>
                  <Link
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                      });
                    }}
                    to="/">
                    Home
                  </Link>
                </motion.li>
                {navLink.map((item, i) => (
                  <motion.li
                    key={item.name}
                    variants={animation1}
                    transition={{ duration: '1', delay: 0.5 + i }}>
                    <LinkSmooth to={item.to} offset={item.offset} smooth={true} duration={500}>
                      {item.name}
                    </LinkSmooth>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
          <div className={style.socialBlock}>
            <motion.p variants={animation} transition={{ duration: '1' }}>
              Follow us:
            </motion.p>
            <div className={style.social}>
              <motion.div
                variants={animation1}
                transition={{ duration: '1', delay: 0.5 }}
                className={style.socialItem}>
                <a
                  href="https://twitter.com/FlaryFinance"
                  target="_blank"
                  rel="noreferrer"
                  className={style.socialLink}>
                  <BsTwitterX size={24} style={{ color: '#ffa957' }} />
                  <span>X</span>
                </a>
              </motion.div>
              <motion.div
                className={style.socialItem}
                variants={animation1}
                transition={{ duration: '1', delay: 1 }}>
                <a
                  className={style.socialLink}
                  href="https://flary-finance.gitbook.io/"
                  target="_blank"
                  rel="noreferrer">
                  <img src={GitBook} alt="GitBook" />
                  <span>GitBook</span>
                </a>
              </motion.div>
              <motion.div
                className={style.socialItem}
                variants={animation1}
                transition={{ duration: '1', delay: 1.5 }}>
                <a
                  className={style.socialLink}
                  href="https://t.me/+6B4CPcSet9VlZDA0"
                  target="_blank"
                  rel="noreferrer">
                  <PiTelegramLogoBold size={24} style={{ color: '#ffa957' }} />
                  <span>Telegram</span>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      <div className={style.middle}></div>
      <div className={style.bottom}>
        <div className={style.address}>
          <p>© 2024 Flary. All rights reserved.</p>
          <p>Al Sila Tower - 24th - Al Maryah Island - Abu Dhabi, UAE</p>
        </div>
        <div className={style.rules}>
          <div onClick={() => setModalPolicyIsOpen(true)} className={style.copy}>
            Privacy policy
          </div>
          <span />
          <div onClick={() => setModalTermsIsOpen(true)} className={style.copy}>
            Terms of use
          </div>
        </div>
        <ModalRules
          isOpen={modalPolicyIsOpen}
          onClose={() => setModalPolicyIsOpen(false)}
          title={
            'PRIVACY POLICY FOR SITE'
          }>
          <p>
            The platform's collection, use, and sharing of personal information are governed by its
            Privacy Policy, which is incorporated into these Terms by reference. By using the
            platform's services, users consent to the processing of their personal information as
            outlined in the Privacy Policy. We use safeguards to preserve the integrity and security
            of your and aggregate data. However, we cannot guarantee that unauthorized third parties
            will never be able to obtain or use your PII or aggregate data for improper purposes.
            You acknowledge that you provide your PII and aggregate data at your own risk, and that
            we will comply with all valid subpoena requests. By accessing and using the Interface,
            you understand and consent to our collection, use, and disclosure of your PII and
            aggregate data.
          </p>
        </ModalRules>
        <ModalRules
          isOpen={modalTermsIsOpen}
          onClose={() => setModalTermsIsOpen(false)}
          title={'TERMS OF USE FOR SITE'}>
          <p>
            Flary Finance is an innovative cross-chain lending platform connecting EVM and non-EVM
            networks including bitcoin ordinals, FlaryFinance (“we”, “our”, or “us”). provides its
            users with lending&borrowing&bridging services (”Protocol”), through its website. <br />
            <br /> Use of the Services To use the Services, you must legally be able to enter into
            the Agreement. By using the Services, you represent and warrant that you meet the
            eligibility requirement. If you do not meet the requirement, you must not access or use
            the Site or the Services. FLARY FINANCE AND THE FLFI TOKEN IS NOT OFFERED TO PERSON OR
            ENTITIES WHO RESIDE IN, ARE CITIZENS OF, ARE LOCATED IN, ARE INCORPORATED IN, OR HAVE A
            REGISTERED OFFICE IN THE UNITED STATES OF AMERICA (COLLECTIVELY, “US PERSONS”).
            MOREOVER, NO SERVICES (AS DEFINED BELOW) ARE OFFERED TO PERSON OR ENTITIES WHO RESIDE IN
            ARE CITIZENS OF, ARE LOCATED IN, ARE INCORPORATED IN, OR HAVE A REGISTERED OFFICE IN ANY
            SANCTIONED TERRITORY (AS DEFINED BELOW, AND ANY SUCH PERSON OR ENTITY FROM A SANCTIONED
            TERRITORY, A “SANCTIONED PERSON”). WE DO NOT MAKE EXCEPTIONS; THEREFORE, IF YOU ARE A
            U.S. PERSON, THEN DO NOT ATTEMPT TO USE THE APP OR PROTOCOL, AND IF YOU ARE A SANCTIONED
            PERSON, THEN DO NOT ATTEMPT TO USE ANY OF THE SERVICES, USE OF A VIRTUAL PRIVATE NETWORK
            (”VPN”) TO CIRCUMVENT THE RESTRICTIONS SET FORTH HEREIN IS PROHIBITED. ARBITRATION
            NOTICE: THESE TERMS (“TERMS”) CONTAIN AN ARBITRATION CLAUSE BELOW. EXCEPT FOR CERTAIN
            TYPES OF DISPUTES MENTIONED IN THAT ARBITRATION CLAUSE, YOU AND WE AGREE THAT ANY
            DISPUTES RELATING TO THE SERVICES (AS DEFINED BELOW) WILL BE RESOLVED BY MANDATORY
            BINDING ARBITRATION, AND YOU WAIVE ANY RIGHT TO A TRIAL BY JURY OR TO PARTICIPATE IN A
            CLASS-ACTION LAWSUIT OR CLASS-WIDE ARBITRATION. You are entering into a binding
            Agreement. BY ACCESSING OR USING OUR SERVICES, WHICH INCLUDE OUR VARIOUS WEBSITES,
            INCLUDING, WITHOUT LIMITATION, Flary.finance (AND ANY RESPECTIVE OR RELATED SUBDOMAINS);
            APPLICATIONS (COLLECTIVELY WITH ANY MATERIALS AND SERVICES AVAILABLE THEREIN, AND
            SUCCESSOR WEBSITE(S) OR APPLICATION(S) THERETO, THE “SITE”), AND OTHER SERVICES THAT
            LINK TO THESE TERMS, AS WELL AS ANY INFORMATION, TEXT, LINKS, GRAPHICS, PHOTOS, AUDIO,
            VIDEO, OR OTHER MATERIALS STORED, RETRIEVED OR APPEARING THEREON, WHETHER ACCESSED
            THROUGH THE SITE OR OTHERWISE (COLLECTIVELY, THE “SERVICES”), YOU ARE ENTERING INTO A
            BINDING AGREEMENT WITH US THAT INCLUDES THESE TERMS, Flary.finance - PRIVACY POLICY
            (FOUND HERE), AND OTHER POLICIES REFERENCED HEREIN (COLLECTIVELY, THE “AGREEMENT”). To
            the extent that there is a conflict between these Terms and any applicable additional
            terms, these Terms will control unless expressly stated otherwise. If you don't agree
            with these Terms, you may not use the Services and should not visit the Site or
            otherwise engage with the Services. We may update the Services and the Terms. We may
            update the Services, the Agreement, and any part of the Terms at any time, for any
            reason, at our sole discretion. Once any part of the Agreement is updated and in effect,
            you will be bound by the Terms if you continue to use the Services, including by
            accessing the Site. We may, at any time, and without liability to you, modify or
            discontinue all or part of the Services (including access to the Services via any
            third-party links). You may contact us with questions about your use of the Services at
            FlayFinance@gmail.com. When you communicate with us electronically, you consent to
            receive communications from us electronically. You should review the Terms from time to
            time to ensure that you understand the terms and conditions that apply to you when you
            access or use the Site. <br />
            <br /> Assumption of Risk You assume the risks of engaging in transactions that rely on
            smart contracts and other experimental technology. Transactions on the Flary Finance
            Protocol rely on smart contracts, blockchains, cryptographic tokens generated by the
            smart contracts, and other nascent software, applications and systems that interact with
            blockchain-based networks. These technologies are experimental, speculative, inherently
            risky, and subject to change. Among other risks, bugs, malfunctions, cyberattacks, or
            changes to the applicable blockchain (e.g., forks) could disrupt these technologies and
            even result in a total loss of cryptoassets, their market value, or digital funds. You
            are solely responsible for the safekeeping of the private key associated with the
            blockchain address used to interact with the Protocol. We assume no liability or
            responsibility for any such risks. If you are not comfortable assuming these risks, you
            should not access or engage in transactions using blockchain-based technology. One of
            the other defining features of blockchain technology is that its entries are immutable,
            which means, as a technical matter, they generally cannot be deleted or modified by
            anyone. This includes smart contracts and cryptoassets generated and programmed by smart
            contracts. THUS, TRANSACTIONS RECORDED ON THE BLOCKCHAIN, INCLUDING TRANSFERS OF
            CRYPTOASSETS AND DATA PROGRAMMED INTO THESE ASSETS MUST BE TREATED AS PERMANENT AND
            CANNOT BE UNDONE BY US OR BY ANYONE. YOU MUST BE VERY CAREFUL WHEN YOU FINALIZE ANY
            TRANSACTION THAT WILL BE RECORDED ON THE BLOCKCHAIN. We are not liable for any
            third-party services or links. We are not responsible for the content or services of any
            third-party, including, without limitation, any network, or apps like Discord, or
            MetaMask, and we make no representations regarding the content or accuracy of any
            third-party services or materials. The use and access of any third-party products or
            services, including through the Services, is at your own risk. You agree to the
            automated collection and disbursement of assets by smart contracts. You acknowledge and
            agree that all transactions accessed through the Services will be automatically
            processed using one or more blockchain-based smart contracts. By engaging in
            transactions using the Services, you acknowledge and consent to the automatic processing
            of all transactions in connection with using the Services. You further acknowledge and
            agree that the applicable smart contract will dictate how the funds of a transaction and
            ownership of cryptoassets are distributed. You acknowledge the risks of using the
            Services. You bear sole responsibility for evaluating the Services before using them,
            and all transactions accessed through the Services are irreversible, final, and without
            refunds. The Services may be disabled, disrupted or adversely impacted as a result of
            sophisticated cyber-attacks, surges in activity, computer viruses, and/or other
            operational or technical challenges, among other things. We disclaim any ongoing
            obligation to notify you of all of the potential risks of using and accessing our
            Services. You acknowledge there is a real risk that assets deposited into the protocol
            and Protocol related tokens: FLFI and vault tokens may suffer complete and permanent
            economic loss should the protocol’s technical or economic mechanisms suffer catastrophic
            failure. You acknowledge that the terms of the Protocol may change at any time for any
            reason included but not limited to protocol fees, rewards, and accessibility. You agree
            to (defined below) accept these risks and agree that you will not seek to hold any Flary
            Indemnified Party responsible for any consequent losses. You are solely responsible for
            the security of your wallet. You understand and agree that you are solely responsible
            for maintaining the security of your wallet. Any unauthorized access to your wallet by
            third parties could result in the loss or theft of any cryptoasset, or any funds held in
            your account and any associated accounts. You understand and agree that we have no
            involvement in, and you will not hold us responsible for managing and maintaining the
            security of your wallet. You further understand and agree that we are not responsible,
            and you will not hold us accountable, for any unauthorized access to your wallet. It is
            your responsibility to monitor your wallet. We reserve the right to restrict your access
            from engaging with the Services. You agree that we have the right to restrict your
            access to the Services via any technically available methods if we suspect, in our sole
            discretion, that (a) you are using the Services for money laundering or any illegal
            activity; (b) you have engaged in fraudulent activity; (c) you have acquired
            cryptoassets using inappropriate methods, including the use of stolen funds to purchase
            such assets; (d) you are the target of any sanctions administered or enforced by the
            U.S. Department of the Treasury’s Office of Foreign Assets Control (“OFAC”), the United
            Nations Security Council, the European Union, Her Majesty’s Treasury, or any other legal
            or regulatory authority in any applicable jurisdiction; (e) either you, as an individual
            or an entity, or your wallet address is listed on the Specially Designated Nationals and
            Blocked Persons List (“SDN List”), Consolidated Sanctions List (“Non-SDN Lists), or any
            other sanctions lists administered by OFAC; (f) you are located, organized, or resident
            in a country or territory that is, or whose government is, the subject of sanctions,
            including but not limited to Côte d’Ivoire, Cuba, Belarus, Iran, Iraq, Liberia, North
            Korea, Sudan, and Syria; or (g) you have otherwise acted in violation of these Terms. If
            we have a reasonable suspicion that you are utilizing the Site for illegal purposes, we
            reserve the right to take whatever action we deem appropriate. We do not guarantee the
            quality or accessibility of the Services. As a condition to accessing or using the
            Services or the Site, you acknowledge, understand, and agree that from time to time, the
            Site and the Services may be inaccessible or inoperable for any reason, including, but
            not limited to equipment malfunctions, periodic maintenance procedures or repairs,
            causes beyond our control or that we could not reasonably foresee, disruptions and
            temporary or permanent unavailability of underlying blockchain infrastructure or
            unavailability of third-party service providers or external partners for any reason. You
            acknowledge and agree that you will access and use the Services, including, without
            limitation, the Site at your own risk. You should not engage in blockchain-based
            transactions unless it is suitable given your circumstances and financial resources. By
            using the Services, you represent that you have been, are and will be solely responsible
            for conducting your own due diligence into the risks of a transaction and the underlying
            smart contracts and cryptoassets. <br />
            <br /> Taxes You are responsible for your taxes and duties. Users bear sole
            responsibility for paying any and all taxes, duties, and assessments now or hereafter
            claimed or imposed by any governmental authority associated with their use of the
            Services, and/or payable as the result of using and/or exploiting any cryptoassets and
            interacting with smart contracts. Blockchain-based transactions are novel, and their tax
            treatment is uncertain. <br />
            <br /> Prohibited Content You may only use the Services if you comply with this
            Agreement (including, without limitation, these Terms), applicable third-party policies,
            and all applicable laws, rules, regulations and related guidance. The following conduct
            is prohibited: using the Services for, or to promote or facilitate, illegal activity
            (including, without limitation, money laundering, financing terrorism, tax evasion,
            buying or selling illegal drugs, contraband, counterfeit goods, or illegal weapons);
            exploiting the Services for any unauthorized commercial purpose; uploading or
            transmitting viruses, worms, Trojan horses, time bombs, cancel bots, spiders, malware or
            any other type of malicious code that will or may be used in any way that will affect
            the functionality or operation of the Services; attempting to or actually copying or
            making unauthorized use of all or any portion of the Services, including by attempting
            to reverse compile, reformatting or framing, disassemble, reverse engineer any part of
            the Services; harvesting or otherwise collecting information from the Services for any
            unauthorized purpose; using the Services under false or fraudulent pretenses or
            otherwise being deceitful; interfering with other users’ access to or use of the
            Services; interfering with or circumventing of the security features of the Services or
            any third party’s systems, networks or resources used in the provision of Services;
            engaging in any attack, hack, denial-of-service attack, interference, or exploit of any
            smart contract in connection with use of the Service (and operations performed by a user
            that are technically permitted by a smart contract may nevertheless be a violation of
            our Agreement, including these Terms, and the law); or engaging in any anticompetitive
            behavior or other misconduct. Violating our rules may result in our intervention. You
            agree and acknowledge that if you use the Services to engage in conduct prohibited by
            applicable law, permanently reserve the right to completely or partially restrict or
            revoke your access to the Services, either completely or for a period of time, at our
            sole discretion. We reserve the right to amend, rectify, edit, or otherwise alter
            transaction data to remediate or mitigate any damage caused either to us or to any other
            person as a result of a user’s violation of this Agreement or applicable law. We reserve
            the right to investigate violations. We reserve the right to investigate and prosecute
            any suspected breaches of this Agreement, including the Terms. We may disclose any
            information as necessary to satisfy any law, regulation, legal process, or governmental
            request. <br />
            <br /> Disclaimers and Limitations of Liability THE FLARY FINANCE PROTOCOL IS PROVIDED
            “AS IS”, AT YOUR OWN RISK, AND WITHOUT WARRANTIES OF ANY KIND. No developer, personal or
            entity involved in creating FlaryFinance will be liable for any claims or damages
            whatsoever associated with your use, inability to use, or your interaction with other
            users of Flary Finance, including any direct, indirect, incidental, special, exemplary,
            punitive or consequential damages, or loss of profits, cryptocurrencies, tokens, or
            anything else of value. <br />
            <br /> Indemnification You agree to indemnify, defend, and hold harmless the
            FlaryFInance and OUR PARENTS, SUBSIDIARIES, AFFILIATES, RELATED COMPANIES, OFFICERS,
            DIRECTORS, CONTRACTORS, EMPLOYEES, AGENTS, REPRESENTATIVES, PARTNERS, AND LICENSORS
            (COLLECTIVELY, THE “FLARYFINANCE INDEMNIFIED PARTIES”) from any claim or demand,
            including reasonable attorneys’ fees, made by any third party due to or arising out of:
            (a) your breach or alleged breach of the Agreement (including, without limitation, these
            Terms); (b) anything you contribute to the Services; (c) your misuse of the Services, or
            any smart contract and/or script related thereto; (d) your violation of any laws, rules,
            regulations, codes, statutes, ordinances, or orders of any governmental or
            quasi-governmental authorities; (e) your violation of the rights of any third party,
            including any intellectual property right, publicity, confidentiality, property, or
            privacy right; (f) your use of a third-party product, service, and/or website; or (g)
            any misrepresentation made by you. We reserve the right to assume, at your expense, the
            exclusive defense and control of any matter subject to indemnification by you. You agree
            to cooperate with our defense of any claim. You will not in any event settle any claim
            without our prior written consent. <br />
            <br />
            Waiver of Injunctive or Other Equitable Relief. TO THE MAXIMUM EXTENT PERMITTED BY LAW,
            YOU AGREE THAT YOU WILL NOT BE PERMITTED TO OBTAIN AN INJUNCTION OR OTHER EQUITABLE
            RELIEF OF ANY KIND, SUCH AS ANY COURT OR OTHER ACTION THAT MAY INTERFERE WITH OR PREVENT
            THE DEVELOPMENT OR EXPLOITATION OF THE SERVICES, OR ANY OTHER WEBSITE, APPLICATION,
            CONTENT, SUBMISSION, PRODUCT, SERVICE, OR INTELLECTUAL PROPERTY OWNED, LICENSED, USED OR
            CONTROLLED BY ANY FLARY PROTOCOL INDEMNIFIED PARTY. <br />
            <br /> Termination; Cancellation This Agreement is effective unless and until terminated
            by either you or us. You may terminate your Agreement with us at any time by ceasing all
            access to the Site, Protocol and/or the Services. If, in our sole judgment, you fail, or
            we suspect that you have failed, to comply with any term or provision of the Agreement
            (including without limitation any provision of these Terms), we reserve the right to
            terminate our Agreement with you and deny you access to the Services. We further reserve
            the right to restrict your access to the Site or to stop providing you with all or a
            part of the Services at any time and for no reason, including, without limitation, if we
            reasonably believe: (a) your use of the Services exposes us to risk or liability; (b)
            you are using the Services for unlawful purposes; or (c) it is not commercially viable
            to continue providing you with our Services. All of these are in addition to any other
            rights and remedies that may be available to us, whether in equity or at law, all of
            which we expressly reserve. WE RESERVE THE RIGHT TO MODIFY THE SERVICES AT ANY TIME, BUT
            WE HAVE NO OBLIGATION TO UPDATE THE SERVICES. YOU AGREE THAT IT IS YOUR RESPONSIBILITY
            TO MONITOR CHANGES TO THE SERVICES THAT MAY AFFECT YOU. YOU AGREE THAT WE MAY REMOVE THE
            SERVICES AND/OR ANY CONTENT THEREON FOR INDEFINITE PERIODS OF TIME OR CANCEL THE
            SERVICES AT ANY TIME, WITHOUT NOTICE TO YOU. <br />
            <br /> Severability If any provision of the Agreement (including, without limitation,
            these Terms) is determined to be unlawful, void, or unenforceable, such provision shall
            nonetheless be enforceable to the fullest extent permitted by applicable law, and the
            unenforceable portion shall be deemed to be severed from the Agreement. Such
            determination shall not affect the validity and enforceability of any other remaining
            provisions. Assignment The Agreement (including, without limitation, these Terms) may be
            assigned without your prior consent to any Flary Indemnified Party, or to its successors
            in the interest of any business associated with the Services provided by us. You may not
            assign or transfer any rights or obligations under the Agreement without our prior
            written consent. Entire Agreement The Agreement (including, without limitation, these
            Terms, and the Flary Privacy Policy) and any policies or operating rules posted by us on
            the Services constitute the entire agreement and understanding between you and us and
            govern your use of the Services, superseding any prior or contemporaneous agreements,
            communications, and proposals, whether oral or written, between you and us (including,
            but not limited to, any prior versions of these Terms). Any failure by us to exercise or
            enforce any right or provision of the Agreement (including, without limitation, these
            Terms) shall not constitute a waiver of such right or provision. Governing Law These
            Terms and any separate agreements whereby we provide you Services shall be governed by
            and construed in accordance with the laws of the Panama Islands. <br />
            <br />
            No Fiduciary Duties This Agreement is not intended to, and does not, create or impose
            any fiduciary duties on us. To the fullest extent permitted by law, you acknowledge and
            agree that we owe no fiduciary duties or liabilities to you or any other party, and that
            to the extent any such duties or liabilities may exist at law or in equity, those duties
            and liabilities are hereby irrevocably disclaimed, waived, and eliminated. You further
            agree that the only duties and obligations that we owe you are those set out expressly
            in this Agreement.
            <br />
            <br /> <br />
            <br />
            <h2>RISKS RELATING TO PARTICIPATION IN THE TOKEN SALE</h2>
            The Token Sale may not result in an active or liquid market for the Tokens.
            <br />
            <br />
            In the event that the Company ever decides to seek the approval for availability of the
            Tokens for trading on any cryptocurrency exchange, there is no assurance that such
            approval will be obtained. Furthermore, even if such approval is granted by a
            cryptocurrency exchange, there is no assurance that an active or liquid trading market
            for the Tokens will develop, or if developed, will be sustained after the Tokens have
            been made available for trading on such market. There is also no assurance that the
            market price of the Tokens will not decline below the original or issue purchase
            price/Token Private Sale Price (the “Purchase Price”). The Purchase Price may not be
            indicative of the market price of the Tokens after they have been made available for
            trading on a market.
            <br />
            <br />
            A Token is not a currency issued by any central bank or national, supra-national or
            quasi-national organisation, nor is it backed by any hard assets or other credit nor is
            it a commodity in the traditional sense of that word. The Company is not responsible
            for, nor does it pursue, the circulation and trading of Tokens on any market. Trading of
            Tokens will merely depend on the consensus on its value between the relevant market
            participants. No one is obliged to purchase any Token from any holder of the Token,
            including the purchasers, nor does anyone guarantee the liquidity or market price of
            Tokens to any extent at any time. Furthermore, Tokens may not be resold to purchasers
            who are citizens, nationals, residents (tax or otherwise) and/or green card holders of
            Restricted Jurisdictions or to Restricted Persons or to purchasers in any other
            jurisdiction where the purchase of Tokens may be in violation of applicable laws.
            Accordingly, the Company cannot ensure that there will be any demand or market for
            Tokens, or that the Purchase Price is indicative of the market price of Tokens after
            they have been made available for trading on any cryptocurrency exchange or market.
            <br />
            <br />
            Future sales or issuance of the Tokens could materially and adversely affect the market
            price of Tokens.
            <br />
            <br />
            Any future sale of the Tokens would increase the supply of Tokens in the market and this
            may result in a downward price pressure on the Token. The sale or distribution of a
            significant number of Tokens outside of the Token Sale (including but not limited to
            transfer of Tokens to persons other than purchasers for purposes of community
            initiatives, business development, academic research, education and market expansion and
            issuance of Tokens as a reward to users of the FlaryFinance that is being further
            developed or otherwise), or the perception that such further sales may occur, could
            adversely affect the trading price of the Tokens.
            <br />
            <br />
            Negative publicity may materially and adversely affect the price of the Tokens. Negative
            publicity involving the Company, the Company’s that is being further developed, the
            Tokens or any of the key personnel of the Company and/or regulation of distributed
            ledger technologies, cryptocurrencies and/or crowdsales of tokens in any jurisdiction,
            may materially and adversely affect the market perception or market price of the Tokens,
            whether or not it is justified.
            <br />
            <br />
            There is no assurance of any success of the Company’s Token Sale or business platform
            that is being further developed as envisaged by the Available Information.
            <br />
            <br /> The value of, and demand for, the Tokens hinges heavily on the performance of the
            Company’s Token Sale and FlaryFinance that is being further developed and the continuous
            active engagement of its users and success of its contemplated business lines. There is
            no assurance that the Company’s Token Sale will be successful or that the FlaryFinance
            that is being further developed will gain or continue to gain traction. While the
            Company has made every effort to provide a realistic estimate, there is also no
            assurance that the cryptocurrencies raised in the Token Sale will be sufficient for the
            development of the FlaryFinance. For the foregoing or any other reason, the development
            of the FlaryFinance and launch of the anticipated Token functionality may not be
            completed and there is no assurance that it will be launched at all. As such,
            distributed Tokens may hold little or no worth or value and this would impact any
            trading price and/or use of the Tokens.
            <br />
            <br /> The trading price of the Tokens may fluctuate following the Token Sale.
            <br />
            <br /> The prices of cryptographic tokens in general tend to be relatively volatile, and
            can fluctuate significantly over short periods of time. The demand for, and the
            corresponding market price of, the Tokens may fluctuate significantly and rapidly in
            response to, among others, the following factors, some of which are beyond the control
            of the Company:
            <br />
            <br /> ‍ - new technical innovations;
            <br /> - analysts’ speculations, recommendations, perceptions or estimates of the
            Token’s market price or the Company’s financial and business performance; <br />-
            changes in market valuations and token prices of entities with businesses similar to
            that of the Company that may be listed on the same cryptocurrency exchanges or markets
            as the Tokens;
            <br /> - announcements by the Company of significant events, for example partnerships,
            sponsorships or new product developments;
            <br /> - fluctuations in market prices and trading volume of cryptocurrencies on
            cryptocurrency exchanges or markets;
            <br /> - additions or departures of key personnel of the Company;
            <br /> - success or failure of the Company’s management in implementing business and
            growth strategies;
            <br /> and/or
            <br /> - changes in conditions affecting the blockchain or financial technology
            industry, the general economic conditions or market sentiments, or other events or
            factors.
            <br />
            <br /> Flary Finance is an innovative cross-chain lending platform connecting EVM and
            non-EVM networks including bitcoin ordinals, FlaryFinance (“we”, “our”, or “us”).
            provides its users with lending&borrowing&bridging services (”Protocol”), through its
            website.
            <br /> <br />
            Your use of Flary involves various risks, including, but not limited to, losses while
            digital assets are deposited into Flary via smart contract or economic exploits, and
            losses due to depegging and redemptions. Before borrowing, taking leverage, or liquidity
            providing, you should fully review the rest of our documentation to understand how the
            Flary Protocol works.
            <br />
            <br /> While our code has been thoroughly vetted by multiple independent software
            security firms, there remains a risk that assets deposited into the protocol as well as
            the FLFI tokens may suffer complete and permanent economic loss should the protocol’s
            technical or economic mechanisms suffer catastrophic failure.
            <br />
            <br /> We make no representations or warranties THE FLARY FINANCE PROTOCOL IS PROVIDED
            “AS IS”, AT YOUR OWN RISK, AND WITHOUT WARRANTIES OF ANY KIND. No developer, personal or
            entity involved in creating FlaryFinance will be liable for any claims or damages
            whatsoever associated with your use, inability to use, or your interaction with other
            users of Flary Finance, including any direct, indirect, incidental, special, exemplary,
            punitive or consequential damages, or loss of profits, cryptocurrencies, tokens, or
            anything else of value.
            <br /> <br />
            FLARY FINANCE AND THE FLARY TOKEN IS NOT OFFERED TO PERSON OR ENTITIES WHO RESIDE IN,
            ARE CITIZENS OF, ARE LOCATED IN, ARE INCORPORATED IN, OR HAVE A REGISTERED OFFICE IN THE
            UNITED STATES OF AMERICA (COLLECTIVELY, “US PERSONS”). MOREOVER, NO SERVICES (AS DEFINED
            BELOW) ARE OFFERED TO PERSON OR ENTITIES WHO RESIDE IN ARE CITIZENS OF, ARE LOCATED IN,
            ARE INCORPORATED IN, OR HAVE A REGISTERED OFFICE IN ANY SANCTIONED TERRITORY (AS DEFINED
            BELOW, AND ANY SUCH PERSON OR ENTITY FROM A SANCTIONED TERRITORY, A “SANCTIONED
            PERSON”). WE DO NOT MAKE EXCEPTIONS; THEREFORE, IF YOU ARE A U.S. PERSON, THEN DO NOT
            ATTEMPT TO USE THE APP OR PROTOCOL, AND IF YOU ARE A SANCTIONED PERSON, THEN DO NOT
            ATTEMPT TO USE ANY OF THE SERVICES, USE OF A VIRTUAL PRIVATE NETWORK (”VPN”) TO
            CIRCUMVENT THE RESTRICTIONS SET FORTH HEREIN IS PROHIBITED.
          </p>
        </ModalRules>
      </div>
    </div>
  );
};
