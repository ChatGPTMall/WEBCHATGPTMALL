import React from "react";
import { Button } from "antd";

const styles = {
  button:{

  },
  profileCard: {
    width: '500px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    padding: '10px',
    textAlign: 'center',
  },
  profilePicture: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    margin: '0 auto 20px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
  },
  name: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  jobTitle: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '10px',
  },
  contactInfo: {
    fontSize: '14px',
    color: '#888',
  },
  socialLinks: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  socialLink: {
    margin: '0 5px',
    color: '#555',
    fontSize: '20px',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  socialLinkHover: {
    color: '#007bff',
  },
}

const VendorProfileCard = ({vendorDetails, onClose}) => {
  const handleSearchClick = () => {
    onClose()
    
  }
  const shopurl = vendorDetails?.FeaturedValues.filter(item => item.Name === 'shopUrl').map(item => item.Value)
  const stars  = vendorDetails?.FeaturedValues.filter(item => item.Name === 'stars').map(item => item.Value)
return (
  <>
   <Button style={{ width: 230, marginRight: '10rem' }} onClick={handleSearchClick}>
      Back
    </Button>
  <div style={styles.profileCard}>
  <img
    src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLHkBiatLKKuKRl3gg0_yzCVP9qeEmIVydxxmrQOAoMg&s" || vendorDetails.PictureUrl}
    alt="Profile Picture"
    style={styles.profilePicture}
  />
  <div style={styles.name}>Name: {vendorDetails.Name}</div>
  <div style={styles.jobTitle}>Shop Name: {vendorDetails.ShopName}</div>
  <div style={styles.jobTitle}>Scores: {vendorDetails.Scores.DeliveryScore}</div>
  <div style={styles.jobTitle}>Provider Type: {vendorDetails.ProviderType}</div>
  <div style={styles.jobTitle}>Credit: {vendorDetails.Credit.Level}</div>
  <div style={styles.jobTitle}> Email: {vendorDetails?.Email || 'Email Not Available'}</div>
  <div style={styles.jobTitle}> Stars: {stars.toString()}</div>
  <div style={styles.jobTitle}>
   Shop Url :
    <a
      href={shopurl.toString()}
      target="_blank"
    >
      {shopurl.toString()}
     </a>
  </div>
</div>
</>
  );
}
export default VendorProfileCard