import React from "react";
import styles from "../../styles/shared/MilkStrengthFlavourOptions.module.css";

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
            <div className={styles.optionsContainer}>
                  {/* Milk Options */}
                  {product.milkOptions && product.milkOptions.length > 0 && (
                        <div className={styles.optionsGroup}>
                              <h3 className={styles.optionTitle}>Milk</h3>
                              <div className={styles.radioGrid}>
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
                                                <span className={styles.optionLabel}>{option}</span>
                                          </label>
                                    ))}
                              </div>
                        </div>
                  )}

                  {/* Strength Options, check the added 90c */}
                  {product.strengthOptions && product.strengthOptions.length > 0 && (
                        <div className={styles.optionsGroup}>
                              <h3 className={styles.optionTitle}>Strength</h3>
                              <div className={styles.radioGrid}>
                                    {product.strengthOptions.map((option, index) => (
                                          <label key={index} className={styles.optionItem2}>
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
                                                            <span className={styles.extraCost}> + 90 cents</span>
                                                      )}
                                                </span>
                                          </label>
                                    ))}
                              </div>
                        </div>
                  )}

                  {/*Allll flavours get $1.00 next to it */}
                  {product.flavourOptions && product.flavourOptions.length > 0 && (
                        <div className={styles.optionsGroup}>
                              <h3 className={styles.optionTitle}>Flavour</h3>
                              <div className={styles.radioGrid}>
                                    {product.flavourOptions.map((option, index) => (
                                          <label key={index} className={styles.optionItem3}>
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
            </div>
      );
};

export default MilkStrengthFlavourOptions;
