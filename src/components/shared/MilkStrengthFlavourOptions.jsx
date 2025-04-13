import React from "react";
import styles from "../../styles/Shared/ProductPage.module.css";

const MilkStrengthFlavourOptions = ({
      product,
      selectedMilk,
      setSelectedMilk,
      selectedStrength,
      setSelectedStrength,
      selectedFlavour,
      setSelectedFlavour,
}) => {
      return (
            <>
                  {/* Milk Options */}
                  {product.milkOptions && product.milkOptions.length > 0 && (
                        <div className={styles.optionSection}>
                              <h3 className={styles.optionTitle}>Milk</h3>
                              <div className={styles.optionGrid}>
                                    {product.milkOptions.map((option, index) => (
                                          <label key={index} className={styles.optionItem}>
                                                <input
                                                      type="radio"
                                                      name="milk"
                                                      value={option}
                                                      checked={selectedMilk === option}
                                                      onChange={() => {
                                                            setSelectedMilk((prev) => (prev === option ? "" : option));
                                                      }}
                                                      className={styles.radioInput}
                                                />
                                                <span className={styles.customRadio}></span>
                                                {option}
                                          </label>
                                    ))}
                              </div>
                        </div>
                  )}

                  {/* Strength Options */}
                  {product.strengthOptions && product.strengthOptions.length > 0 && (
                        <div className={styles.optionSection}>
                              <h3 className={styles.optionTitle}>Strength</h3>
                              <div className={styles.optionGrid2}>
                                    {product.strengthOptions.map((option, index) => (
                                          <label key={index} className={styles.optionItem}>
                                                <input
                                                      type="radio"
                                                      name="strength"
                                                      value={option}
                                                      checked={selectedStrength === option}
                                                      onChange={() => setSelectedStrength(option)}
                                                      className={styles.radioInput}
                                                />
                                                <span className={styles.customRadio}></span>
                                                <span className={styles.optionLabel}>
                                                      {option}
                                                      {option.toLowerCase().includes("extra shot") && (
                                                            <span className={styles.extraCost2}></span>
                                                      )}
                                                </span>
                                          </label>
                                    ))}
                                    <h4>+ 90 cents</h4>
                              </div>
                        </div>
                  )}

                  {/* Flavour Options */}
                  {product.flavourOptions && product.flavourOptions.length > 0 && (
                        <div className={styles.optionSection}>
                              <h3 className={styles.optionTitle}>Flavour</h3>
                              <div className={styles.extraCost}></div>
                              <div className={styles.optionGrid2}>
                                    {product.flavourOptions.map((option, index) => (
                                          <label key={index} className={styles.optionItem}>
                                                <input
                                                      type="radio"
                                                      name="flavour"
                                                      value={option}
                                                      checked={selectedFlavour === option}
                                                      onChange={() => setSelectedFlavour(option)}
                                                      className={styles.radioInput}
                                                />
                                                <span className={styles.customRadio}></span>
                                                <span className={styles.optionLabel}>
                                                      {option}
                                                      <span className={styles.extraCost}> + $1.00</span>
                                                </span>
                                          </label>
                                    ))}
                              </div>
                        </div>
                  )}
            </>
      );
};

export default MilkStrengthFlavourOptions;
